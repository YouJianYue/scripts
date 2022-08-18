from typing import *
import re

AnyType = Any
OptStr = Optional[str]


class PdfExtra:

    def get_pdf_text(self, file: AnyType, method: str):
        """
        :param file: 单个pdf文件
        :param method: 读取pdf所需第三方库。例如 fitz,pdfplumber
        :return: pdf文字信息
        """

        methods = {"fitz": ["page_count", "load_page", "get_text"], "pdfplumber": ["pages", "extract_text"]}
        if method not in methods: raise AttributeError(f"暂不支持{method}库")
        var = __import__(method)
        texts = ""
        with var.open(file) as doc:
            pages = getattr(doc, methods[method][0], None)
            if isinstance(pages, int):
                pages = [i for i in range(pages)]
            for i in pages:
                if method == "fitz":
                    page = getattr(doc, methods[method][1], None)
                    _ = getattr(page(i), methods[method][-1], None)
                    texts += _('text')

                if method == "pdfplumber":
                    _ = getattr(i, methods[method][-1])
                    texts += _()
        return texts

    def regex_get_info(self, text: str, header: List, regex: List) -> dict:
        """
        输出表头
        :param text: pdf提取文本内容
        :param header: 输出表头  ['身份证号码']
        :param regex: 正则表达式 ['[4][0-9]{13}']
        :return:
        """
        if len(header) != len(regex): raise AttributeError("表头和正则数量不匹配")
        res = dict.fromkeys(header)
        for i, j in enumerate(res):
            match_obj = re.search(regex[i], text, re.M | re.I)
            res[j] = match_obj.group(1)
        return res


if __name__ == '__main__':
    PdfExtra()
