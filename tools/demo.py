# -*- coding: utf-8 -*-
import openai
from tools import Parser as parser

openai.api_key = parser.get("Base", "OpenAiKey")


def request_openai(text: str):
    # Use the GPT-3 model
    completion = openai.Completion.create(
        engine="text-davinci-002",
        prompt=text,
        max_tokens=1024,
        temperature=0.5
    )
    return completion.choices[0].text


if __name__ == '__main__':
    print(request_openai("python是什么东西"))
