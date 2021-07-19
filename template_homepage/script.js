var canvasDiv = document.getElementById('particle-canvas');
var options = {
  particleColor: '#e37575',
 
  interactive: true,
  speed: 'medium',
  density: 'high'
};
var particleCanvas = new ParticleNetwork(canvasDiv, options);