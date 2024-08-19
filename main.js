// helper functions
function createSVGElements (...elems) {
    return elems.map(
      elem => document.createElementNS('http://www.w3.org/2000/svg', elem)
    )
  }
  
  function setAttributes(elem, attribs) {
    for (const [key, value] of Object.entries(attribs)) {
      elem.setAttribute(key, value)
    }
  }
  
  function appendChildren(elem, ...children) {
    children.forEach(child => elem.appendChild(child))
  }
  
  // Create a class for the element
  class CircleHR extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
    }
  
    connectedCallback() {
      // Create a shadow root
      const shadow = this.attachShadow({ mode: 'open' });
      
      // Create line Break
      const hr = document.createElement('hr');
  
      // Create SVG elements
      const [svg, rect, circle, path] = createSVGElements('svg', 'rect', 'circle', 'path');
  
      setAttributes(svg, { 
        'viewBox': '0 0 100 100'
      })
      
      setAttributes(rect, { 
          'width': '100', 
          'height': '100', 
          'stroke': 'none', 
          'fill': 'black' 
      })
      
      setAttributes(path, {
        'd': 'M 1 50 A 49 49 0 0 1 99 50', 
        'fill': 'transparent', 
        'stroke-width': '2' 
      })
      
      setAttributes(circle, {
        'cx': '50', 'cy': '50', 'r': '34', 'stroke-width': '10'
      })
  
      appendChildren(svg, rect, path, circle)
      
      // Create some CSS to apply to the shadow dom
      const style = document.createElement('style');
      const size = this.getAttribute('size');
      const color = this.getAttribute('color');
  
      style.textContent = `
        hr {
          background-color: ${color};
          margin: 50px 0 0 0;
          height: 1px;
          border: none;
        }
        
        svg {
          position: relative;
          top: calc(-0.5*${size});
          width: ${size};
          display: block;
          margin: auto;
          stroke: ${color};
        }
        
        circle {
          cursor: pointer;
        }
      `;
  
      // Attach the created elements to the shadow dom
      appendChildren(shadow, style, hr, svg)
    }
  }
  
  customElements.define('hr-circle', CircleHR);