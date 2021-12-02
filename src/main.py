from openie import StanfordOpenIE
from owlready2 import *

import helper
import rules

properties = {
    'openie.affinity_probability_cap': 2 / 3
}

# def getQuestionsAndAnswer():
onto = get_ontology("../resources/qgen.owl").load()

with onto:
    class Person(Thing): pass

    def getPerson(name):
        ans = None
        for person in onto.get_instances_of(Person):
        # for person in onto.get_instances_of(onto.Person):
            if (person._name).lower() == name.lower():
                ans = person
                break

        if ans is None:
            # ans = onto.Person(name)
            ans = Person(name, namespace=onto)

        return ans


    # for rule in rules.rules:
    #     print(rule)
    #     ruleImp = Imp()
    #     ruleImp.set_as_rule(rule)

    ontoPropertyLabels = {}
    # for prop in list(onto.properties()):
    #     print(helper.camel_case_split(prop._name), type (prop))
    #     print(prop._name, type(prop))

    # text2 = "Sam is the father of Tom. Tara is the wife of Sam."
    # text = "Sam is the father of Tom. Tara is the wife of Sam. Sarah is the sister of Tom."
    text = "Sam is the son of Tom. Tom is the parent of Carl."

    filteredTriples = []

    with StanfordOpenIE(properties=properties) as client:
        print('Text: %s' % text)
        for triple in client.annotate(text):
            print(triple, type(triple))

            relationCamelCase = helper.camel_case_join(triple['relation'].split(" "))
            prop = helper.closest_relation(relationCamelCase, onto)

            if prop is not None:
                triple['subject'] = getPerson(triple['subject'])
                triple['relation'] = prop
                triple['object'] = getPerson(triple['object'])
                filteredTriples.append(triple)

    print("----------------")

    for triple in filteredTriples:
        s = triple['subject']
        p = triple['relation']
        o = triple['object']
        # print(s, type(s))
        print(p, type(p), p._name)
        name = p._name
        s.__setattr__(p._name, [o])
        # s[p._name].append(o)
        # print(o, type(o))
        # print(s.storid, triple, o.storid)
        # print(s.namespace.world._props.get(p.storid))
        # s.__setattr__(p.storid, o)
        # s[p._name] = o
        # obj = Person(s._name, namespace=onto, p=[o])
        # print("here", obj, type (obj))
        # triple['subject'].[triple['relation']] = triple['object']

# for s, p, o in onto.get_triples():
#     x = default_world._entities.get(s)
#     y = default_world._entities.get(p)
#     z = default_world._entities.get(o)


sync_reasoner_pellet(infer_property_values=True, infer_data_property_values=True)
# print("a2 gender: ", a2.gender)
print(list(default_world.sparql("SELECT ?x WHERE{ ?x <http://www.semanticweb.org/qgen/ontologies/relationships#gender> 'female'.}")))
infer = get_ontology("http://inferrences/")
# print("ontoTestRule_2: \n ------------------------------------------------------")
# print("t:",infer.get_triples())

inferredTriples1 = set()

for s, p, o in infer.get_triples():
    # print(s, p, o)
    x = default_world._entities.get(s)
    y = default_world._entities.get(p)
    z = default_world._entities.get(o)
    # if(not x or not y or not z):
    if (not x or not y or not z):
        print("sub:", x, " pred:", y, " obj: ", o)
    else:
        inferredTriples1.add((x, y, z))
        # print("sub:", x, " pred:", y, " obj: ", z)

print("inferredTriples1-------------------------------------------------------")

for triple in inferredTriples1:
    print(triple)

with onto:
    class Person(Thing):
        pass
    class different_people(Person >> Person):
        equivalent_to = []

    for rule in rules.rules:
        print(rule)
        ruleImp = Imp()
        ruleImp.set_as_rule(rule)

sync_reasoner_pellet(infer_property_values=True, infer_data_property_values=True)

inferredTriples2 = set()

for s, p, o in infer.get_triples():
    # print(s, p, o)
    x = default_world._entities.get(s)
    y = default_world._entities.get(p)
    z = default_world._entities.get(o)
    if(not x or not y or not z):
        print("sub:", x, " pred:", y, " obj: ", o)
    else:
        if x is not z:
            inferredTriples2.add((x, y, z))
        # print("sub:", x, " pred:", y, " obj: ", z)

print("inferredTriples2-------------------------------------------------------")

for triple in inferredTriples2 - inferredTriples1:
    print(triple)

# f1 = open("file1.txt", "w")
# f1.write(inferredTriples1)
# f1.close()
#
# f2 = open("file2.txt", "w")
# f2.write(inferredTriples2)
# f2.close()





# amar = onto.Person("Amar")
# aman = onto.Person("Aman")
# amar.hasBrother = aman
# print(amar.hasBrother, type (amar.hasBrother))
# print()

# getQuestionsAndAnswer()

# amar = onto.Person("Amar")
# print("name", amar.name)
# print("gender", amar.gender)
#
# # onto.Person("Amar")
#
# # default_world.save()
#
# obo = onto.get_namespace("Person")
# print(obo.name)
#
# for row in list(default_world.sparql("SELECT ?x { ?x a <http://www.semanticweb.org/qgen/ontologies/relationships#Person> . }")):
#     print(row)


# print(onto.person)
# print(onto.Person)
# print(onto.isBrotherOf)

# amar = onto.Person("Amar")
# aman = onto.Person("Aman")
#
# print(amar.get_properties())
# print(amar.hasBrother)
#
# print(aman.get_properties())
# print(aman.isBrotherOf)

# print(type (amar))
# print("gender", amar.gender)
#
# print(onto.get_instances_of(onto.Person))

# onto.Person.namespace.base_iri + onto.Person._name
