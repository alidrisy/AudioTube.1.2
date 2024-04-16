import Miniget from "miniget";
import axios from "axios";

const DEFAULT_CONTEXT = {
  client: {
    utcOffsetMinutes: 0,
    gl: "US",
    hl: "en",
    clientName: "WEB",
    clientVersion: "<important information>",
  },
  user: {},
  request: {},
};

const DEFAULT_OPTIONS = { limit: 100, safeSearch: false };
const DEFAULT_QUERY = { gl: "US", hl: "en" };

const BASE_SEARCH_URL = "https://www.youtube.com/results?";
const BASE_URL = "https://www.youtube.com/";
const BASE_API_URL = "https://www.youtube.com/youtubei/v1/search?key=";

const cutAfterJSON = (mixedJson) => {
  let open, close;
  if (mixedJson[0] === "[") {
    open = "[";
    close = "]";
  } else if (mixedJson[0] === "{") {
    open = "{";
    close = "}";
  }

  if (!open) {
    throw new Error(
      `Can't cut unsupported JSON (need to begin with [ or { ) but got: ${mixedJson[0]}`,
    );
  }

  // States if the loop is currently in a string
  let isString = false;

  // States if the current character is treated as escaped or not
  let isEscaped = false;

  // Current open brackets to be closed
  let counter = 0;

  let i;
  for (i = 0; i < mixedJson.length; i++) {
    // Toggle the isString boolean when leaving/entering string
    if (mixedJson[i] === '"' && !isEscaped) {
      isString = !isString;
      continue;
    }

    // Toggle the isEscaped boolean for every backslash
    // Reset for every regular character
    isEscaped = mixedJson[i] === "\\" && !isEscaped;

    if (isString) continue;

    if (mixedJson[i] === open) {
      counter++;
    } else if (mixedJson[i] === close) {
      counter--;
    }

    // All brackets have been closed, thus end of JSON is reached
    if (counter === 0) {
      // Return the cut JSON
      return mixedJson.substr(0, i + 1);
    }
  }

  // We ran through the whole string and ended up with an unclosed bracket
  throw Error("Can't cut unsupported JSON (no matching closing bracket found)");
};

export const parseBody = (body, options = {}) => {
  let json = null;
  try {
    json = jsonAfter(body, "var ytInitialData = ");
  } catch (e) {
    // Defaulting to null if failed to parse json => results in a retry in main
  }
  const apiKey =
    between(body, 'INNERTUBE_API_KEY":"', '"') ||
    between(body, 'innertubeApiKey":"', '"');
  const clientVersion =
    between(body, 'INNERTUBE_CONTEXT_CLIENT_VERSION":"', '"') ||
    between(body, 'innertube_context_client_version":"', '"');
  // Make deep copy and set clientVersion
  const context = JSON.parse(JSON.stringify(DEFAULT_CONTEXT));
  context.client.clientVersion = clientVersion;
  // Add params to context
  if (options.gl) context.client.gl = options.gl;
  if (options.hl) context.client.hl = options.hl;
  if (options.utcOffsetMinutes)
    context.client.utcOffsetMinutes = options.utcOffsetMinutes;
  if (options.safeSearch) context.user.enableSafetyMode = true;
  // Return multiple values
  return { json, apiKey, context };
};

const jsonAfter = (haystack, left) => {
  const pos = haystack.indexOf(left);
  if (pos === -1) {
    return null;
  }
  haystack = haystack.slice(pos + left.length);
  try {
    return JSON.parse(cutAfterJSON(haystack));
  } catch (e) {
    return null;
  }
};

export const between = (haystack, left, right) => {
  let pos;
  pos = haystack.indexOf(left);
  if (pos === -1) {
    return "";
  }
  pos += left.length;
  haystack = haystack.slice(pos);
  pos = haystack.indexOf(right);
  if (pos === -1) {
    return "";
  }
  haystack = haystack.slice(0, pos);
  return haystack;
};

const checkArgs = (searchString, options = {}) => {
  // Validation
  if (!searchString) {
    throw new Error("search string is mandatory");
  }
  if (typeof searchString !== "string") {
    throw new Error("search string must be of type string");
  }

  // Normalisation
  let obj = Object.assign({}, DEFAULT_OPTIONS, options);
  // Other optional params
  if (!isNaN(obj.pages) && obj.pages > 0) {
    // Disable limit if pages is provided
    obj.limit = Infinity;
  } else if (isNaN(obj.limit) || obj.limit <= 0) {
    // Default limit
    obj.pages = Infinity;
    obj.limit = DEFAULT_OPTIONS.limit;
  }
  if (typeof obj.safeSearch !== "boolean")
    obj.safeSearch = DEFAULT_OPTIONS.safeSearch;
  // Default requestOptions
  obj.requestOptions = Object.assign({}, options.requestOptions);
  // Unlink requestOptions#headers
  if (obj.requestOptions.headers) {
    obj.requestOptions.headers = JSON.parse(
      JSON.stringify(obj.requestOptions.headers),
    );
  }
  // Setting cookie in request headers to get safe search results
  if (obj.safeSearch) {
    if (!obj.requestOptions.headers) obj.requestOptions.headers = {};
    if (!obj.requestOptions.headers.Cookie)
      obj.requestOptions.headers.Cookie = [];
    obj.requestOptions.headers.Cookie.push("PREF=f2=8000000");
  }
  // Set required parameter: query
  const inputURL = new URL(searchString, BASE_URL);
  if (
    searchString.startsWith(BASE_URL) &&
    inputURL.pathname === "/results" &&
    inputURL.searchParams.has("sp")
  ) {
    // Watch out for requests with a set filter
    // in such a case searchString would be an url including `sp` & `search_query` querys
    if (!inputURL.searchParams.get("search_query")) {
      throw new Error('filter links have to include a "search_string" query');
    }
    // Object.fromEntries not supported in nodejs < v12
    obj.query = {};
    for (const key of inputURL.searchParams.keys()) {
      obj.query[key] = inputURL.searchParams.get(key);
    }
  } else {
    // If no filter-link default to passing it all as query
    obj.query = { search_query: searchString };
  }
  // Save the search term itself for potential later use
  obj.search = obj.query.search_query;

  // Add additional information
  obj.query = Object.assign({}, DEFAULT_QUERY, obj.query);
  if (options && options.gl) obj.query.gl = options.gl;
  if (options && options.hl) obj.query.hl = options.hl;
  return obj;
};

export const helper = async (searchString, options, rt = 3) => {
  if (rt === 0) throw new Error("Unable to find JSON!");
  // Set default values
  console.log("start");
  const opts = checkArgs(searchString, options);

  const ref = BASE_SEARCH_URL + new URLSearchParams(opts.query).toString();
  console.log(ref);
  const body = await axios.get(ref, opts.requestOptions);
  console.log(body);
  const parsed = parseBody(body.data, opts);
  // Retry if unable to find json => most likely old response
  console.log("end");
  if (!parsed.json) return helper(searchString, options, rt - 1);
  console.log(parsed);
};
