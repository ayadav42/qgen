rules = [
    "Person(?s), isParentOf(?p1, ?s), isWifeOf(?p2, ?p1) -> isParentOf(?p2, ?s)",
    "Person(?x), Person(?z), isSiblingOf(?x, ?z), isParentOf(?y, ?z) -> isParentOf(?y, ?x)",
    "Person(?s), Person(?p), isSisterOf(?s, ?p) -> gender(?s, 'female')",
    "Person(?s), Person(?p), isBrotherOf(?s, ?p) -> gender(?s, 'male')",
    "Person(?x), Person(?z), Person(?y), isSonOf(?x, ?z), isParentOf(?z, ?y) -> isBrotherOf(?x, ?y)",
    "Person(?x), Person(?z), isSonOf(?x, ?z) -> gender(?x, 'male')",
    "Person(?x), Person(?z), isDaughterOf(?x, ?z) -> gender(?x, 'female')",
    "Person(?x), Person(?z), isDaughterOf(?x, ?z), isParentOf(?z, ?y) -> isSisterOf(?x, ?y)",
    "Person(?x), Person(?y), isMotherOf(?x, ?y) -> gender(?x, 'female')",
    "Person(?x), Person(?y), isWifeOf(?x, ?y) ->  gender(?x, 'female')",
    "Person(?x), Person(?y), isHusbandOf(?x, ?y) ->  gender(?x, 'male')"
]