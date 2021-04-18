// Wrap code inside a function that will automatically
// resize the visuals based on the window size

function resizeResponse(){



}

// Call resize function when browser is loads
resizeResponse ();

// Call rezie function when the window is resized
d3.select(window).("resize", resizeResponse);

