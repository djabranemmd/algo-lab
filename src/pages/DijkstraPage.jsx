import {
  useMemo,
  useState,
} from "react";

import usePlayback from "../hooks/usePlayback";

import PlaybackControls from "../components/controls/PlaybackControls";

import {
  generateDijkstraSteps,
} from "../algorithms/dijkstra";


function DijkstraPage() {

  const [nodes, setNodes] =
    useState([]);

  const [edges, setEdges] =
    useState([]);


  const [
    fromNode,
    setFromNode,
  ] = useState("");

  const [
    toNode,
    setToNode,
  ] = useState("");

  const [
    weight,
    setWeight,
  ] = useState(1);


  const [
    startNode,
    setStartNode,
  ] = useState("");


  const [
    endNode,
    setEndNode,
  ] = useState("");


  const [
    started,
    setStarted,
  ] = useState(false);



  const addNode = () => {

    const nextLetter =
      String.fromCharCode(
        65 + nodes.length
      );


    setNodes((prev)=>[
      ...prev,
      {
        id: nextLetter,

        x:
          120 +
          (prev.length % 4) *
          150,

        y:
          120 +
          Math.floor(
            prev.length / 4
          ) *
          150,
      },
    ]);
  };



  const addEdge = () => {

    if(
      !fromNode ||
      !toNode ||
      fromNode === toNode ||
      weight <= 0
    ){
      return;
    }


    const exists =
      edges.some(
        (edge)=>
          (
            edge.from === fromNode &&
            edge.to === toNode
          )
          ||
          (
            edge.from === toNode &&
            edge.to === fromNode
          )
      );


    if(exists){
      return;
    }


    setEdges((prev)=>[
      ...prev,
      {
        from: fromNode,
        to: toNode,
        weight:Number(weight),
      }
    ]);
  };



  const steps =
    useMemo(()=>{

      if(!started){
        return [];
      }


      return generateDijkstraSteps(
        nodes,
        edges,
        startNode,
        endNode
      );

    },[
      started,
      nodes,
      edges,
      startNode,
      endNode,
    ]);



  const playback =
    usePlayback(
      steps.length || 1
    );



  const step =
    steps[
      playback.currentStep
    ]
    ||
    {
      current:null,
      visited:[],
      distances:{},
      path:[],
      description:
        "Create graph and run Dijkstra",
    };



  const runDijkstra = ()=>{

    if(
      !startNode ||
      !endNode
    ){
      return;
    }


    setStarted(true);


    setTimeout(()=>{
      playback.reset();
    },0);

  };



  return (

<section className="container-page">

<h1 className="algorithm-title">
Dijkstra Shortest Path
</h1>


<div className="graph-builder-actions">

<button
className="generate-btn"
onClick={addNode}
>
Add Node
</button>

</div>



<div className="edge-controls">


<select
value={fromNode}
onChange={(e)=>
setFromNode(e.target.value)
}
>

<option value="">
From
</option>

{
nodes.map(node=>(
<option
key={node.id}
value={node.id}
>
{node.id}
</option>
))
}

</select>



<select
value={toNode}
onChange={(e)=>
setToNode(e.target.value)
}
>

<option value="">
To
</option>


{
nodes.map(node=>(
<option
key={node.id}
value={node.id}
>
{node.id}
</option>
))
}

</select>



<input
type="number"
min="1"
value={weight}
onChange={(e)=>
setWeight(e.target.value)
}
/>


<button
className="generate-btn"
onClick={addEdge}
>
Add Weighted Edge
</button>


</div>




<div className="edge-controls">


<select
value={startNode}
onChange={(e)=>
setStartNode(e.target.value)
}
>

<option value="">
Start
</option>

{
nodes.map(node=>(
<option
key={node.id}
value={node.id}
>
{node.id}
</option>
))
}

</select>



<select
value={endNode}
onChange={(e)=>
setEndNode(e.target.value)
}
>

<option value="">
Destination
</option>


{
nodes.map(node=>(
<option
key={node.id}
value={node.id}
>
{node.id}
</option>
))
}

</select>


<button
className="generate-btn"
onClick={runDijkstra}
>
Run Dijkstra
</button>


</div>




<div className="graph-builder-canvas">


<svg
className="graph-builder-svg"
width="100%"
height="100%"
>


{
edges.map((edge,index)=>{

const from =
nodes.find(
n=>n.id===edge.from
);


const to =
nodes.find(
n=>n.id===edge.to
);


if(!from || !to){
return null;
}


return (

<g key={index}>

<line
x1={from.x}
y1={from.y}
x2={to.x}
y2={to.y}
/>


<text
x={
(from.x+to.x)/2
}
y={
(from.y+to.y)/2
}
>
{edge.weight}
</text>

</g>

);

})
}


</svg>



{
nodes.map(node=>{

let className =
"graph-builder-node";


if(
step.visited.includes(
node.id
)
){
className +=
" graph-visited";
}


if(
step.current === node.id
){
className +=
" graph-current";
}



if(
step.path.includes(
node.id
)
){
className +=
" graph-path";
}


return (

<div

key={node.id}

className={className}

style={{
left:node.x,
top:node.y
}}

>

{node.id}

</div>

);


})
}


</div>



{
started &&
<>

<div className="queue-box">

Current Node:
{" "}
{step.current || "-"}

</div>



<div className="traversal-box">

Distances:

{
Object.entries(
step.distances
)
.map(
([key,value])=>(

<div key={key}>

{key} :
{" "}
{
value === Infinity
?
"∞"
:
value
}

</div>

))
}

</div>




<PlaybackControls

isPlaying={
playback.isPlaying
}

onPlay={
playback.play
}

onPause={
playback.pause
}

onNext={
playback.next
}

onPrev={
playback.prev
}

onReset={
playback.reset
}

speed={
playback.speed
}

setSpeed={
playback.setSpeed
}

/>



<div className="description-box">

{step.description}

</div>


</>

}



</section>

  );

}


export default DijkstraPage;