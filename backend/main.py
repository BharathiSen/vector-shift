from fastapi import FastAPI, Body
from typing import List, Dict, Any
from collections import deque

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, you would specify the exact origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Dict[Any, Any] = Body(...)):
    nodes = pipeline.get('nodes', [])
    edges = pipeline.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if the graph is a Directed Acyclic Graph (DAG)
    # Using Kahn's algorithm or DFS. Let's use Kahn's for efficiency.
    adj = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}
    
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adj and target in in_degree:
            adj[source].append(target)
            in_degree[target] += 1
            
    queue = deque([node_id for node_id in in_degree if in_degree[node_id] == 0])
    count = 0
    
    while queue:
        u = queue.popleft()
        count += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
                
    is_dag = (count == num_nodes)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
