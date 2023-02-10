from pathlib import Path

try:
    import configparser as ConfigParser
except ImportError:
    import ConfigParser as ConfigParser

__version__ = 0.1
__author__ = "YouJianYue"
cfg_fn = Path(__file__).parent.parent / "sample.cfg"

Parser = ConfigParser.ConfigParser()
Parser.read(cfg_fn)
