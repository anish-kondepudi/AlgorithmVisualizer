
export const landingPage = () => {

  return (
    
    <div className="landingPage">

      <script src="https://rawgit.com/JulianLaval/canvas-particle-network/master/particle-network.min.js"></script>

      <div id="particle-canvas"></div>

      <div id="navigation">
        <button className="btnHome" onClick={event =>  window.location.href='/sorting'}>Sorting</button>
        <button className="btnHome" onClick={event =>  window.location.href='/graph'}>Graphs</button>
      </div>

      <div id="title">
        <span>
          <b>ALGORITHM</b>
        </span>
        <br/>
        <span>
          <b>VISUALIZER</b>
        </span>
      </div>

      {() => {
        var canvasDiv = document.getElementById('particle-canvas');
        var options = {
          particleColor: '#e37575',
          interactive: true,
          speed: 'medium',
          density: 'high'
        };
        /*var particleCanvas = new ParticleNetwork(canvasDiv, options);*/
      }}

    </div>
  );
}
