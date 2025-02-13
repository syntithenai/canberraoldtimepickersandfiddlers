import React, { Component , useState, useEffect, useRef} from 'react';
import { Button, Navbar, Form, Dropdown, FormControl,Container, Card, ListGroup ,ProgressBar, Col, Row} from 'react-bootstrap';
import PlayPauseButton from './PlayPauseButton'
import 'bootstrap/dist/css/bootstrap.min.css';
import useAbcTools from './useAbcTools'
import CustomNavbar from './CustomNavbar'
import TuneList from './TuneList'
import ReactPlayer from "react-player";
import ABCJS from "abcjs";

var Rabbit = function() { return <svg style={{height:'20px'}} focusable="false" aria-hidden="true" viewBox="0 0 20 20"><path d="M10.817 0c-2.248 0-1.586 0.525-1.154 0.505 1.551-0.072 5.199 0.044 6.851 2.428 0 0-1.022-2.933-5.697-2.933zM10.529 0.769c-2.572 0-2.837 0.51-2.837 1.106 0 0.545 1.526 0.836 2.524 0.697 2.778-0.386 4.231-0.12 5.264 0.865-1.010 0.779-0.75 1.401-1.274 1.851-1.093 0.941-2.643-0.673-4.976-0.673-2.496 0-4.712 1.92-4.712 4.76-0.157-0.537-0.769-0.913-1.442-0.913-0.974 0-1.514 0.637-1.514 1.49 0 0.769 1.13 1.791 2.861 0.938 0.499 1.208 2.265 1.364 2.452 1.418 0.538 0.154 1.875 0.098 1.875 0.865 0 0.794-1.034 1.094-1.034 1.707 0 1.070 1.758 0.873 2.284 1.034 1.683 0.517 2.103 1.214 2.788 2.212 0.771 1.122 2.572 1.408 2.572 0.625 0-3.185-4.413-4.126-4.399-4.135 0.608-0.382 2.139-1.397 2.139-3.534 0-1.295-0.703-2.256-1.755-2.861 1.256 0.094 2.572 1.205 2.572 2.74 0 1.877-0.653 2.823-0.769 2.957 1.975-1.158 3.193-3.91 3.029-6.37 0.61 0.401 1.27 0.577 1.971 0.625 0.751 0.052 1.475-0.225 1.635-0.529 0.38-0.723 0.162-2.321-0.12-2.837-0.763-1.392-2.236-1.73-3.606-1.683-1.202-1.671-3.812-2.356-5.529-2.356zM1.37 3.077l-0.553 1.538h3.726c0.521-0.576 1.541-1.207 2.284-1.538h-5.457zM18.846 5.192c0.325 0 0.577 0.252 0.577 0.577s-0.252 0.577-0.577 0.577c-0.325 0-0.577-0.252-0.577-0.577s0.252-0.577 0.577-0.577zM0.553 5.385l-0.553 1.538h3.197c0.26-0.824 0.586-1.328 0.769-1.538h-3.413z"></path></svg>}
var Tortoise = function() { return  <svg style={{height:'20px'}} focusable="false" aria-hidden="true" viewBox="0 0 20 20"><path d="M17.212 3.846c-0.281-0.014-0.549 0.025-0.817 0.144-1.218 0.542-1.662 2.708-2.163 3.942-1.207 2.972-7.090 4.619-11.755 5.216-0.887 0.114-1.749 0.74-2.428 1.466 0.82-0.284 2.126-0.297 2.74 0.144 0.007 0.488-0.376 1.062-0.625 1.37-0.404 0.5-0.398 0.793 0.12 0.793 0.473 0 0.752 0.007 1.635 0 0.393-0.003 0.618-0.16 1.49-1.49 3.592 0.718 5.986-0.264 5.986-0.264s0.407 1.755 1.418 1.755h1.49c0.633 0 0.667-0.331 0.625-0.433-0.448-1.082-0.68-1.873-0.769-2.5-0.263-1.857 0.657-3.836 2.524-5.457 0.585 0.986 2.253 0.845 2.909-0.096s0.446-2.268-0.192-3.221c-0.49-0.732-1.345-1.327-2.188-1.37zM8.221 4.663c-0.722-0.016-1.536 0.111-2.5 0.409-4.211 1.302-4.177 4.951-3.51 5.745 0 0-0.955 0.479-0.409 1.274 0.448 0.652 3.139 0.191 5.409-0.529s4.226-1.793 5.312-2.692c0.948-0.785 0.551-2.106-0.505-1.947-0.494-0.98-1.632-2.212-3.798-2.26zM18.846 5.962c0.325 0 0.577 0.252 0.577 0.577s-0.252 0.577-0.577 0.577c-0.325 0-0.577-0.252-0.577-0.577s0.252-0.577 0.577-0.577z"></path></svg> }
var Shuffle = function() {return <svg id="Flat" fill="black" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <path d="M238.18311,189.0752c-.11622.14111-.2417.27368-.36719.40649-.0542.05762-.10205.11914-.15869.17554l-24,24a8.00053,8.00053,0,0,1-11.31446-11.31446L212.686,192H200.93555a72.14126,72.14126,0,0,1-58.58887-30.15137L100.63379,103.4502A56.11029,56.11029,0,0,0,55.06445,80H32a8,8,0,0,1,0-16H55.06445a72.14126,72.14126,0,0,1,58.58887,30.15137l41.71289,58.39843A56.11029,56.11029,0,0,0,200.93555,176H212.686l-10.34327-10.34277a8.00053,8.00053,0,0,1,11.31446-11.31446l24,24c.05664.0564.10449.11792.15869.17554.12549.13281.251.26538.36719.40649.0913.11084.17138.22706.25537.34156.07031.0957.14453.188.21093.28686.085.12647.15918.25782.23584.38819.05567.09423.11524.186.167.283.06933.12915.12841.262.18994.39379.04931.10547.10205.20874.147.31665.05225.12647.09522.25562.14063.38428.042.11817.0874.23462.124.35523.03906.1289.06787.25976.10058.39013.03077.12305.06543.24414.09034.36939.02978.15137.04834.30444.06933.457.01465.106.03516.21.0459.31714a8.02276,8.02276,0,0,1,0,1.584c-.01074.10718-.03125.21118-.0459.31714-.021.15259-.03955.30566-.06933.457-.02491.12525-.05957.24634-.09034.36939-.03271.13037-.06152.26123-.10058.39013-.03662.12061-.082.23706-.124.35523-.04541.12866-.08838.25781-.14063.38428-.04492.10791-.09766.21118-.147.31665-.06153.13183-.12061.26464-.18994.39379-.05176.09693-.11133.18873-.167.283-.07666.13037-.15087.26172-.23584.38819-.0664.09887-.14062.19116-.21093.28686C238.35449,188.84814,238.27441,188.96436,238.18311,189.0752Zm-95.16944-82.09375a7.99621,7.99621,0,0,0,11.15918-1.86036l1.19336-1.67089A56.11029,56.11029,0,0,1,200.93555,80H212.686L202.34277,90.34277a8.00053,8.00053,0,0,0,11.31446,11.31446l24-24c.05664-.0564.10449-.11792.15869-.17554.12549-.13281.251-.26538.36719-.40649.0913-.11084.17138-.22706.25537-.34156.07031-.0957.14453-.188.21093-.28686.085-.12647.15918-.25782.23584-.38819.05567-.09423.11524-.186.167-.283.06933-.12915.12841-.262.18994-.39379.04931-.10547.10205-.20874.147-.31665.05225-.12647.09522-.25562.14063-.38428.042-.11817.0874-.23462.124-.35523.03906-.1289.06787-.25976.10058-.39013.03077-.12305.06543-.24414.09034-.36939.02978-.15137.04834-.30444.06933-.457.01465-.106.03516-.21.0459-.31714a8.02276,8.02276,0,0,0,0-1.584c-.01074-.10718-.03125-.21118-.0459-.31714-.021-.15259-.03955-.30566-.06933-.457-.02491-.12525-.05957-.24634-.09034-.36939-.03271-.13037-.06152-.26123-.10058-.39013-.03662-.12061-.082-.23706-.124-.35523-.04541-.12866-.08838-.25781-.14063-.38428-.04492-.10791-.09766-.21118-.147-.31665-.06153-.13183-.12061-.26464-.18994-.39379-.05176-.09693-.11133-.18873-.167-.283-.07666-.13037-.15087-.26172-.23584-.38819-.0664-.09887-.14062-.19116-.21093-.28686-.084-.1145-.16407-.23072-.25537-.34156-.11622-.14111-.2417-.27368-.36719-.40649-.0542-.05762-.10205-.11914-.15869-.17554l-24-24a8.00053,8.00053,0,0,0-11.31446,11.31446L212.686,64H200.93555a72.14126,72.14126,0,0,0-58.58887,30.15137l-1.19336,1.6709A7.9986,7.9986,0,0,0,143.01367,106.98145Zm-30.02734,42.0371a7.99671,7.99671,0,0,0-11.15918,1.86036l-1.19336,1.67089A56.11029,56.11029,0,0,1,55.06445,176H32a8,8,0,0,0,0,16H55.06445a72.14126,72.14126,0,0,0,58.58887-30.15137l1.19336-1.6709A7.9986,7.9986,0,0,0,112.98633,149.01855Z"/>
</svg>}
var CloseButton = function() {return <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h24v24h-24z" fill="none"/><path d="m18.3 5.71c-.39-.39-1.02-.39-1.41 0l-4.89 4.88-4.89-4.89c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l4.89 4.89-4.89 4.89c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l4.89-4.89 4.89 4.89c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-4.89-4.89 4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>}


const App = () => {
  const [tunes, setTunes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTuning, setSelectedTuning] = useState("All");
  const [selectedKey, setSelectedKey] = useState("All");
  const [selectedTuneKey, setSelectedTuneKey] = useState(1);
  const [selectedLink, setSelectedLink] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [useShuffle, setUseShuffle] = useState(0);
  const abcTools = useAbcTools()
  const playerRef = useRef(null);
  const notationRef = useRef(null);
  const [currentNotationTune,setCurrentNotationTune] = useState(null)


  useEffect(() => {
    if (notationRef.current && currentNotationTune) {
      const abc = createABCFromJSON(currentNotationTune)
      console.log(abc)
      ABCJS.renderAbc(notationRef.current, abc, {transpose: currentNotationTune.transpose, responsive: "resize"});
    }
  }, [currentNotationTune]);

  function setLinkSelection(tune,link, allowPlay = true) {
    setSelectedTuneKey(tune > 0 ? tune : 0)
    setSelectedLink(link > 0 ? link : 0)
    setProgress(0)
    setDuration(0)
    if (allowPlay) startPlaying()
  }

  function startPlaying() {
    setIsPlaying(true)
  }

  function stopPlaying() {
    setIsPlaying(false)
  }

  function finishedPlaying() {

    if (useShuffle) {
      const randomTune = filteredTunes[Math.floor(Math.random() * filteredTunes.length - 1) + 1]
      setSelectedTuneKey(randomTune.id)
      setCurrentNotationTune(randomTune)
    } else {
      // Check if the current tune exists in the original tunes array
      const originalIndex = selectedTuneKey - 1;
      if (originalIndex < 0 || originalIndex >= tunes.length) {
        stopPlaying();
        return;
      }
    
      // Find the current tune in the filtered list based on selectedTuneKey
      const filteredIndex = filteredTunes.findIndex(t => t.id === selectedTuneKey);
      if (filteredIndex === -1) {
        stopPlaying();
        return;
      }
    
      const currentTune = filteredTunes[filteredIndex];
    
      // Check if the current tune has multiple links and there's a next link
      if (currentTune.links.length > 1 && selectedLink < currentTune.links.length - 1) {
        // Play the next link of the current tune
        setSelectedLink(prev => prev + 1);
      } else {
        // Move to the next tune in the filtered list
        const nextIndex = filteredIndex + 1;
        if (nextIndex < filteredTunes.length) {
          const nextTune = filteredTunes[nextIndex];
          setSelectedTuneKey(nextTune.id);
          setCurrentNotationTune(nextTune)
          setSelectedLink(0);
        } else {
          // Reached the end, stop playing
          stopPlaying();
        }
      }
    }
  }




  function mediaLoaded(v) {
    console.log('loaded',v)
    setDuration(v)
    if (tunes.length > selectedTuneKey - 1  && tunes[selectedTuneKey-1] && Array.isArray(tunes[selectedTuneKey-1].linkStarts) && tunes[selectedTuneKey-1].linkStarts.length > selectedLink) {
      if (tunes[selectedTuneKey - 1].linkStarts[selectedLink] > 0 && v > 0)  {
        setProgress(tunes[selectedTuneKey -1].linkStarts[selectedLink]/v * 100)
        seekMedia(tunes[selectedTuneKey -1].linkStarts[selectedLink]/v * 100)
      }
    }
  }

  function mediaProgress(v) {
    setProgress(v.played * 100)
    if (tunes.length > selectedTuneKey - 1  && tunes[selectedTuneKey-1] && Array.isArray(tunes[selectedTuneKey-1].linkEnds) && tunes[selectedTuneKey-1].linkEnds.length > selectedLink && duration > 0) {
      if (tunes[selectedTuneKey - 1].linkEnds[selectedLink] > 0 && duration > 0)  {
        if (v.playedSeconds > tunes[selectedTuneKey - 1].linkEnds[selectedLink]) {
          finishedPlaying()
        }
      }
    }
  }

  function mediaReady(v) {
    

  //  setProgress(v.played * 100)
  }

  function seekMedia(progress) {
    if(playerRef.current) playerRef.current.seekTo(progress/100,'fraction')
  }


  useEffect(() => {
    fetch("./tunes.abc")
      .then((res) => res.text())
      .then((text) => {
        let t = abcTools.parseABC(text)
        t.sort(function(a,b) {
          if (a && a.title && b && a.title < b.title) return -1
          else return 1
        })
        setTunes(t.map(function(ti,tk) {ti.id = tk + 1; return ti}))
        // console.log(JSON.parse(JSON.stringify(t.map(function(ti,tk) {ti.id = tk + 1; return ti}))))
       
      })
      .catch((error) => console.error("Error loading tunes:", error));
  }, []);

  const filteredTunes = tunes.filter(
    (tune) =>
      tune.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTuning === "All" || tune.tuning === selectedTuning) &&
      (selectedKey === "All" || tune.transposed_key === selectedKey)
  );

  const tuningOptions = ["All", ...new Set(tunes.map((t) => t.tuning))];
  const keyOptions = ["All", ...new Set(tunes.map((t) => t.transposed_key))];

  const [speed, setSpeed] = useState(1);
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

  function incrementSpeed() {
    const currentIndex = speedOptions.indexOf(speed);
    
    if (currentIndex === -1) {
      // If speed is unset or invalid, reset to the first available speed
      setSpeed(1);
    } else if (currentIndex < speedOptions.length - 1) {
      setSpeed(speedOptions[currentIndex + 1]);
    }
  }
  
  function decrementSpeed() {
    const currentIndex = speedOptions.indexOf(speed);
  
    if (currentIndex === -1) {
      // If speed is unset or invalid, reset to the first available speed
      setSpeed(1);
    } else if (currentIndex > 0) {
      setSpeed(speedOptions[currentIndex - 1]);
    }
  }

  function handleProgressClick(event) {
    const progressBar = event.currentTarget;
    const clickX = event.nativeEvent.offsetX;
    const progressBarWidth = progressBar.clientWidth;

    const clickRatio = clickX / progressBarWidth;
    setProgress(parseInt(clickRatio * 100));
    seekMedia(clickRatio * 100)
  }

  function createABCFromJSON(tune) {
    let final = []
    final.push("X: 111")
    if (tune && tune.composer) final.push("C: "+ tune.composer)
    if (tune && tune.meter) final.push("M: "+ tune.meter)
    if (tune && tune.noteLength) final.push("L: "+ tune.noteLength)
    if (tune && tune.key) final.push("K: "+ tune.key)
    if (tune && tune.notes) final.push(tune.notes)
    if (tune && Array.isArray(tune.lyrics) && tune.lyrics.length > 0) {
      tune.lyrics.forEach(function (lyricLine) {
        final.push('W: ' + lyricLine)
      })
    }  
    return final.join("\n").replace("\n\n","\n") + "\n\n"
  }

  function setupNotation(tune) {
    setLinkSelection(tune.id,0,false)
    setCurrentNotationTune(tune)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('setup',tune)
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  

  let currentLink = null;

  if (selectedTuneKey > 0 && tunes[selectedTuneKey - 1] && Array.isArray(tunes[selectedTuneKey - 1].links) && tunes[selectedTuneKey - 1].links.length > 0) {
    if (selectedLink > 0 && tunes[selectedTuneKey - 1].links.length > selectedLink) {
      currentLink = tunes[selectedTuneKey - 1].links[selectedLink]
    } else {
      currentLink = tunes[selectedTuneKey - 1].links[0]
    }
    
  }

  return (
    <>
      <div  style={{zIndex: 10, position:'fixed',top:0,backgroundColor:'black', width:'100%'}}>
        <div  style={{float:'left',color:'white', marginLeft:'0.5em'}} >
        <Form >
            <FormControl
              style={{width:'8em', display:'inline',marginTop:'0.2em'}}
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={function() {setCurrentNotationTune(null)}}
            />
            <Dropdown onSelect={(e) => {setSelectedTuning(e); setCurrentNotationTune(null)}} style={{width:'8em', display:'inline', marginLeft:'0.5em',marginTop:'0.2em'}}>
            <Dropdown.Toggle variant="secondary">Tuning: {selectedTuning}</Dropdown.Toggle>
            <Dropdown.Menu>
              {tuningOptions.map((tuning, index) => (
                <Dropdown.Item key={index} eventKey={tuning}>
                  {tuning}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={(e) => {setSelectedKey(e); setCurrentNotationTune(null)}} style={{width:'8em', display:'inline', marginLeft:'0.5em',marginTop:'0.2em'}}>
            <Dropdown.Toggle variant="secondary">Key: {selectedKey}</Dropdown.Toggle>
            <Dropdown.Menu>
              {keyOptions.map((tuningKey, index) => (
                <Dropdown.Item key={index} eventKey={tuningKey}>
                  {tuningKey}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          </Form>
          

        </div>
        <div  style={{float:'right'}}>
          <PlayPauseButton isPlaying={isPlaying} {...{startPlaying, stopPlaying}}/>
        </div>
        <div  style={{float:'right', marginTop:'0.2em', marginRight:'0.5em', marginBottom:'1em'}}>
        <Button variant={useShuffle ? "primary" : "light"}  onClick={function() {if (useShuffle) {setUseShuffle(false)} else {setUseShuffle(true)} }} style={{marginRight:'0.8em'}}><Shuffle/></Button>
        
          <Button variant="light" onClick={incrementSpeed} ><Rabbit  /></Button>
       
          <Button variant="light" onClick={decrementSpeed} style={{marginLeft:'0.2em'}}><Tortoise  /></Button>
        </div>
       
        <div style={{ marginTop:'1em', paddingBottom:'0.1em', width:'100%'}}>{progress}<ProgressBar onClick={handleProgressClick} now={progress} style={{width:'100%'}} /></div>

        <div style={{ color:'white',  width:'100%'}}>
        <span style={{float:'left', marginRight:'3em', marginLeft:'1em'}}>
        {filteredTunes.length} matches
          </span>
          
          <span style={{float:'left', marginLeft:'1em'}}>
            {((selectedTuneKey > 0) && tunes[selectedTuneKey - 1] && tunes[selectedTuneKey - 1].title) && <b>{tunes[selectedTuneKey - 1].title}</b>}
          </span>
          <span style={{float:'left', marginLeft:'1em'}}>
            {((selectedTuneKey > 0) && tunes[selectedTuneKey - 1] && tunes[selectedTuneKey - 1].composer && tunes[selectedTuneKey - 1].composer.trim()) && <b> - {tunes[selectedTuneKey - 1].composer}</b>}
          </span>
          <span style={{float:'left', marginLeft:'2em', fontSize:'0.7em'}}>
            <a  target='_new' onClick={stopPlaying} href={tunes[selectedTuneKey - 1].links[selectedLink]} >
              {((selectedTuneKey > 0) && tunes[selectedTuneKey - 1] && tunes[selectedTuneKey - 1].links && Array.isArray(tunes[selectedTuneKey - 1].links) && tunes[selectedTuneKey - 1].links.length > selectedLink) && <b>  {tunes[selectedTuneKey - 1].links[selectedLink]}</b>}
            </a>
          </span>
          <span style={{float:'right'}}>
            
            Progress: {(duration > 0) ? formatTime(parseInt(progress/100 * duration)) : 0}/{formatTime(duration)}&nbsp;&nbsp;&nbsp;&nbsp;
            Speed: {speed}&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          
        </div>
      </div>


      {(currentNotationTune) && <div style={{ marginTop:'5em',paddingTop:'2em', height:'2000px', width:'100%',  backgroundColor:'white', zIndex: 50}}  >
              <Button variant="secondary" style={{float:'right'}} onClick={function() {setCurrentNotationTune(null)}} ><CloseButton/></Button>
              <div ref={notationRef}></div>
      </div>}

      {currentLink && <ReactPlayer 
        url={currentLink} 
        controls 
        playing={isPlaying} 
        playbackRate={speed}
        onDuration={mediaLoaded}
        onProgress={mediaProgress}
        onEnded={finishedPlaying}
        onReady={mediaReady}
        width="100%" 
        height="50px"
        progressInterval={100}
        ref={playerRef}
      />}

    {!currentNotationTune && <Container style={{ marginTop: "5em" }}>
        <TuneList tunes={filteredTunes} {...{setLinkSelection, selectedTuneKey, setupNotation}}  />
      </Container>}
    </>
  );
};

export default App;


// <Navbar.Brand>
//             
//           </Navbar.Brand>

         
//           <ProgressBar now={60} style={{minWidth:'400px'}} />