import re
from difflib import SequenceMatcher


def camel_case_split(identifier):
    matches = re.finditer('.+?(?:(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|$)', identifier)
    return [m.group(0) for m in matches]


def camel_case_join(words):
    s = "".join(word[0].upper() + word[1:].lower() for word in words)
    return s[0].lower() + s[1:]


def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()


def closest_relation(relation, onto):
    relationCamelCase = camel_case_join(relation.split(" "))

    ans = None
    maxScore = 0

    for prop in list(onto.properties()):
        score = similar(relationCamelCase, prop._name)
        if score > maxScore:
            maxScore = score
            ans = prop

    print(relationCamelCase, ans, maxScore)

    if maxScore < 0.8:
        return None

    return ans
