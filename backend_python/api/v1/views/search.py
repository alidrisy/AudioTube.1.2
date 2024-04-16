#!/usr/bin/python3
""" Flask Api endpoint for searching """
from api.v1.views import app_audio
from flask import jsonify, make_response
from youtubesearchpython import VideosSearch
import asyncio


async def search(query, max_result, type_vid="tag", num=3):
    """Search youtube videos"""
    yt = VideosSearch(query, limit=80)
    video_list = yt.result()["result"]
    if len(video_list) < max_result:
        yt.next()
        video_list.extend(yt.result()["result"])
    if len(video_list) < max_result:
        yt.next()
        video_list.extend(yt.result()["result"])
    videos = []
    for i in video_list:
        if (
            i["viewCount"]["short"]
            and i["duration"]
            and i["publishedTime"]
            and type_vid != "search"
        ):
            videos.append(i)
        elif type_vid == "search":
            videos.append(i)
    if len(videos) < 1 and num > 0:
        await search(query, max_result, type_vid, num - 1)
    return videos


@app_audio.route("/catagory/<int:catagory_id>/", methods=["GET"], strict_slashes=False)
async def catagories(catagory_id=None):
    """Get content from youtube"""
    podcast = "بودكاست | podcast"
    books = "كتاب | كتب | book | books"
    songs = "أغنية | أغاني | music | song"
    if catagory_id == 0:
        serach = f"{podcast} | {podcast} | {books}"
        vidList = await search(serach, 50)
    elif catagory_id == 10:
        vidList = await search(songs, 50)
    elif catagory_id == 27:
        vidList = await search(books, 50)
    elif catagory_id == 24:
        vidList = await search(podcast, 50)

    return jsonify(vidList)


@app_audio.route("/search/<quary>/", methods=["GET"], strict_slashes=False)
async def searchVid(quary):
    """Search videos by key words"""
    search_list = await search(quary, 50, "search")
    return jsonify(search_list)
