import {  ListGroup ,Button} from 'react-bootstrap';

var MusicNotes = function() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"  d="M0 0h24v24H0z"/><path  fill="lightblue"  d="M20 3v14a4 4 0 1 1-2-3.465V6H9v11a4 4 0 1 1-2-3.465V3h13z"/></svg>}
var PlayMusic = function() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" > <polygon points="5,3 19,12 5,21" /></svg>}




export default function TuneList ({ tunes , selectedTuneKey, setLinkSelection, setupNotation})  {

  return (
    <ListGroup flush >
      {tunes.map((tune, index) => ( 
        <ListGroup.Item key={index} style={{width:'100%', border:((selectedTuneKey )  === index + 1) ? '3px solid black' : '1px solid black', backgroundColor:(index%2 ==0) ? '#b4b3d3' : 'lightblue' }}>
          <Button variant="outline"  onClick={function() {
            setLinkSelection(tune.id,0, false)
        }}>
            <h5 style={{float:'left'}}>{tune.title} </h5>
            {(tune.tuning || tune.transposed_key) && <b style={{float:'left', marginLeft:'1em'}} >(</b>}
            { tune.transposed_key && <p style={{float:'left'}} ><strong>Key:</strong> {tune.transposed_key} </p>}
            {tune.tuning && <p style={{float:'left', marginLeft:'1em'}}><strong>Tuning:</strong> {tune.tuning} </p>}
            {(tune.tuning || tune.transposed_key) && <b style={{float:'left'}}>)</b>}
          </Button>
        <span style={{float:'right'}}>
            {tune.links.map((link, i) => (
                <Button style={{marginLeft:'0.5em' }} variant="primary" onClick={function() {
                    setLinkSelection(tune.id,i)
                }}
                ><PlayMusic/> {i+1}</Button>
            ))}
        
        
        {(tune.notes && tune.notes.trim()) && <Button variant="primary" style={{marginLeft:'0.5em' }} onClick={function() {setupNotation(tune)}} ><MusicNotes/></Button>}
        
        </span>
        
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};