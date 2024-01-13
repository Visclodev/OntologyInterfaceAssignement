from rdflib import Graph

g = Graph()
g.parse("../Ontology/DishFinder.ttl", format="turtle")

# Debugging: Check if the graph is loaded
print("Graph has {} statements.".format(len(g)))

# SPARQL Query
qres = g.query(
    """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX : <http://www.dishfinder.org/>

    SELECT ?dish
    WHERE {
      ?dish rdf:type :Dish .
    }
    """
)

# Debugging: Check if the query returns any results
print("Query returned {} results.".format(len(qres)))

# Iterating over the query results
for row in qres:
    print(row)
