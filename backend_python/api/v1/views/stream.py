#!/usr/bin/python3
""" API Stream AUdio from Video """
from api.v1.views import app_audio
from youtube_dl import YoutubeDL
from flask import jsonify, abort


@app_audio.route("/audios/<video_id>/", methods=["GET"], strict_slashes=False)
def get_audio(video_id):
    """Get audio from youtube video"""
    options = {"format": "bestaudio/best", "quiet": True}
    audio = {}
    with YoutubeDL(options) as yt:
        # extract info without download
        info = yt.extract_info(video_id, download=False)
        inf = info["formats"][0]
        if "audio" in inf["format"] and inf["ext"] == "webm":
            audio.update({"url": inf["url"]})
        else:
            audio.update({"url": inf["url"]})
    return jsonify(audio)


@app_audio.route("/formats/<video_id>/", methods=["GET"], strict_slashes=False)
def download_info(video_id):
    """Get youtube video/audio info and url"""
    video = {}
    with YoutubeDL({"quiet": True}) as yt:
        info = yt.extract_info(video_id, download=False)
        video["title"] = info["title"]
        video["id"] = info["id"]
        video["duration"] = info["duration"]
        video["vformats"] = []
        video["aformats"] = []
        formt = ["720p", "360p", "1080p"]
        for i in info["formats"]:
            quality = i["format_note"].replace("p60", "p")
            if i["ext"] == "mp4" and i["filesize"] != 0 and quality in formt:
                formt.remove(quality)
                video["vformats"].append(
                    {
                        "filesize": i["filesize"],
                        "id": i["format_id"],
                        "format": i["format"],
                        "container": i["ext"],
                        "url": i["url"],
                        "img": info["thumbnail"],
                        "quality": quality,
                        "acodec": i["acodec"],
                    }
                )

            if "audio" in i["format"] and i["ext"] == "m4a":
                video["aformats"].append(
                    {
                        "filesize": i["filesize"],
                        "audioBitrate": i["abr"],
                        "id": i["format_id"],
                        "format": i["format"],
                        "container": i["ext"],
                        "url": i["url"],
                    }
                )
    if len(video) == 0:
        abort(404)
    return jsonify(video)
