import networkx as nx
import string
import random

class MallNavigator:

    def __init__(self):
        self.graph = nx.Graph()
        original_width = 768
        original_height = 445

        new_width = 768
        new_height = 445

        width_ratio = new_width / original_width
        height_ratio = new_height / original_height
        #floor 0

        data = {
            "porch": (272, 326,0),
            "c1": (265, 232,0),
            "c2":(321, 232,0),
            "c3":(213, 225,0),
            "toilet floor 0":(213, 150,0),
            "store":(154, 230,0),
            "library":(152, 193,0),
            "stairs floor 0":(274, 185,0),
            "iedc room":(414, 179,0),
            "micro controller lab":(500, 179,0),
            "sector1":(199, 195,0),
            "security room": (202, 281,0),
            "sector2":(525, 196,0),
            "eee staff room":(525, 196,0),
            "class room floor 0":(525, 196,0),
            "power electronics lab":(349, 215,0),
            "c4":(344, 201,0),  
            "c5": (569, 217,0), 
            "digital lab": (659, 217,0), 
            "c6": (524, 165,0),
            "circuit lab pcb and prototyping lab": (642, 165,0),
            "s0":(274, 132,0),
            #floor 1
            "stairs floor 1": (483, 160,1),
            "iqac room":(529, 157,1),
            "s4 eee":(612, 157,1),
            "com lab 2":(721, 157,1),
            "office":(654, 252,1),
            "sector 3":(631, 192,1),
            "exam cell":(608, 250,1),
            "principal room":(511, 286,1),
            "sector 4":(383, 193,1), 
            "sick room":(385, 275,1),
            "ceo room":(364, 243,1), 
            "s4 civil": (365, 153,1),
            "sector 5":(197, 206,1), 
            "civil dept staff room":(209, 160,2),
            "toilet floor 1":(116, 98,1),
            "s6 civil":(118, 119,1),
            "s8 civil":(117, 306,1),
            "s1":(486, 97,1),   
            #floor 2
            "stairs floor 2": (470, 160,2),
            "s2 cse 2":(533, 159,2),
            "s2 cse 1": (535, 243,2),
            "sector 6":(628, 194,2),
            "seminar hall":(657, 253,2),
            "com lab":(723, 154,2), 
            "cse dept staff room":(381, 317,2),
            "s8 cse":(364, 234,2),
            "s6 eee": (364, 156,2),
            "sector 7":(212, 202,2),       
            "s6 combined class":(207, 156,2),
            "toilet floor 2":(116, 102,2),   
            "s6 cse 1":(123, 117,2),
            "s6 cse 2":(121, 305,2),
            "s2":(485, 91,2),      
             
            
        }

        self.data = {}

        for key, value in data.items():
            resized_x = int(value[0] * width_ratio)
            resized_y = int(value[1] * height_ratio)
            self.data[key] = (resized_x, resized_y, value[2])

        for key, value in self.data.items():
            print(f"{key}: {value}")


    def add_location(self, name, x, y, z):
        self.graph.add_node(name, pos=(int(x), int(y), int(z)))

    def add_connection(self, node1, node2):
        self.graph.add_edge(node1, node2)

    def create_connections(self):
        for name, coordinates in self.data.items():
            self.add_location(name, coordinates[0], coordinates[1], coordinates[2])
        #floor 0
        self.add_connection("porch", "c1") 
        self.add_connection("porch", "security room")
        self.add_connection("c1", "c2") 
        self.add_connection("c1", "c3") 
        self.add_connection("c3", "store") 
        self.add_connection("c3", "sector1")
        self.add_connection("stairs floor 0","sector1")
        self.add_connection("s0","stairs floor 0")
        self.add_connection("sector1", "library")
        self.add_connection("sector1", "toilet floor 0")
        self.add_connection("sector1", "store")
        self.add_connection("stairs floor 0", "iedc room")
        self.add_connection("iedc room", "micro controller lab")
        self.add_connection("micro controller lab", "sector2")
        self.add_connection("sector2", "eee staff room")
        self.add_connection("class room floor 0", "sector2")
        self.add_connection("idec room", "power electronics lab")
        self.add_connection("class room floor 0", "sector2")
        self.add_connection("c4", "power electronics lab")
        self.add_connection("sector2", "power electronics lab")
        self.add_connection("stairs floor 0", "c4")
        self.add_connection("c4", "c2")
        self.add_connection("c5", "sector2")
        self.add_connection("c4", "c2")
        self.add_connection("digital lab", "c5")
        self.add_connection("sector2", "c6")
        self.add_connection("c6","circuit lab pcb and prototyping lab")
        #floor 1
        self.add_connection("s0","stairs floor 1")
        self.add_connection("iqac room","s4 eee")
        self.add_connection("s4 eee","com lab 2")
        self.add_connection("s4 eee","sector 3")
        self.add_connection("sector 3","office")
        self.add_connection("sector 3","com lab 2")
        self.add_connection("exam cell","office")
        self.add_connection("exam cell","sector 3")
        self.add_connection("principal room","stairs floor 1")
        self.add_connection("stairs floor 1","s1")
        self.add_connection("stairs floor 1","placement cell")
        self.add_connection("sector 4","stairs floor 1")
        self.add_connection("sector 4","ceo room")
        self.add_connection("sector 4","s4 civil")
        self.add_connection("sector 4","sick room")
        self.add_connection("sector 5","sector 4")
        self.add_connection("civil dept staff room","sector 5")
        self.add_connection("toilet floor 1","sector 5")
        self.add_connection("s6 civil","sector 5")
        self.add_connection("s8 civil","sector 5")
        #floor 2
        self.add_connection("s1","stairs floor 2")
        self.add_connection("stairs floor 2","s2 cse 1")
        self.add_connection("stairs floor 2","s2 cse 2")
        self.add_connection("s2 cse 2","sector 6")
        self.add_connection("com lab","sector 6")
        self.add_connection("seminar hall","sector 6")
        self.add_connection("stairs floor 2","cse dept staff room")
        self.add_connection("stairs floor 2","s8 cse"),
        self.add_connection("stairs floor 2","s6 eee")
        self.add_connection("stairs floor 2","s2")
        self.add_connection("s8 cse","sector 7")
        self.add_connection("s6 eee","sector 7")
        self.add_connection("toilet floor 2","sector 7")
        self.add_connection("s6 combined class","sector 7")
        self.add_connection("sector 7","s6 cse 1")
        self.add_connection("sector 7","s6 cse 2")
        
        
            
    
    def find_shortest_path(self, start, destination):
        shortest_path_nodes = nx.dijkstra_path(self.graph, start, destination)
        shortest_path_coordinates = [tuple(self.graph.nodes[node]['pos']) for node in shortest_path_nodes]
        return shortest_path_coordinates

    def find_path(self, start, destination):
        shortest_path = self.find_shortest_path(start, destination)
        return shortest_path

    def calculate_average_time(self, start, destination, average_speed):
        shortest_path = self.find_path(start, destination)
        total_distance = 0
        for i in range(len(shortest_path) - 1):
            current_pos = shortest_path[i]
            next_pos = shortest_path[i + 1]
            distance = ((next_pos[0] - current_pos[0]) ** 2 +
                        (next_pos[1] - current_pos[1]) ** 2 +
                        (next_pos[2] - current_pos[2]) ** 2) ** 0.5
            total_distance += distance

        average_time = total_distance / average_speed
        return average_time


# Example usage:
'''
navigator = MallNavigator()
navigator.create_connections()
start_location = "Entrance Hall"
end_location = "Data Center"
path = navigator.find_path(start_location, end_location)
average_time = navigator.calculate_average_time(start_location, end_location, average_speed=1.5)
print("Shortest Path:", path)
print("Estimated Average Time:", average_time)
'''