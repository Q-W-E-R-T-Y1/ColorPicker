   



        function HSLToHex(h,s,l) {
            //   s /= 100;
            //   l /= 100;
            
              let c = (1 - Math.abs(2 * l - 1)) * s,
                  x = c * (1 - Math.abs((h / 60) % 2 - 1)),
                  m = l - c/2,
                  r = 0,
                  g = 0, 
                  b = 0; 
            
              if (0 <= h && h < 60) {
                r = c; g = x; b = 0;
              } else if (60 <= h && h < 120) {
                r = x; g = c; b = 0;
              } else if (120 <= h && h < 180) {
                r = 0; g = c; b = x;
              } else if (180 <= h && h < 240) {
                r = 0; g = x; b = c;
              } else if (240 <= h && h < 300) {
                r = x; g = 0; b = c;
              } else if (300 <= h && h < 360) {
                r = c; g = 0; b = x;
              }
              // Having obtained RGB, convert channels to hex
              r = Math.round((r + m) * 255).toString(16);
              g = Math.round((g + m) * 255).toString(16);
              b = Math.round((b + m) * 255).toString(16);
            
              // Prepend 0s, if necessary
              if (r.length == 1)
                r = "0" + r;
              if (g.length == 1)
                g = "0" + g;
              if (b.length == 1)
                b = "0" + b;
            
              return "#" + r + g + b;
            }
            function RGBToHSL(r,g,b) {
                // Make r, g, and b fractions of 1
                r /= 255;
                g /= 255;
                b /= 255;
              
                // Find greatest and smallest channel values
                let cmin = Math.min(r,g,b),
                    cmax = Math.max(r,g,b),
                    delta = cmax - cmin,
                    h = 0,
                    s = 0,
                    l = 0;
                    if (delta == 0)
                        h = 0;
                      // Red is max
                    else if (cmax == r)
                        h = ((g - b) / delta) % 6;
                      // Green is max
                    else if (cmax == g)
                        h = (b - r) / delta + 2;
                      // Blue is max
                    else
                        h = (r - g) / delta + 4;
                    
                    h = Math.round(h * 60);
                        
                      // Make negative hues positive behind 360°
                      if (h < 0)
                          h += 360;
            
                      l = (cmax + cmin) / 2;

                      // Calculate saturation
                      s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
                        
                      // Multiply l and s by 100
                      s = +(s * 100).toFixed(1);
                      l = +(l * 100).toFixed(1);
                    
                      return h;
                    }
            function hexToRGB(h) {
                let r = 0, g = 0, b = 0;
              
                // 3 digits
                if (h.length == 4) {
                  r = "0x" + h[1] + h[1];
                  g = "0x" + h[2] + h[2];
                  b = "0x" + h[3] + h[3];
              
                // 6 digits
                } else if (h.length == 7) {
                  r = "0x" + h[1] + h[2];
                  g = "0x" + h[3] + h[4];
                  b = "0x" + h[5] + h[6];
                }
                
                return { r, g, b};
              }
            function parseHSL(hslString) {
                // This regular expression matches the HSL format and captures the numeric values
                const regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
                const match = hslString.match(regex);
            
                if (match) {
                    // Extract and convert the captured values
                    const h = parseInt(match[1]);
                    const s = parseFloat(match[2]) / 100; // Convert percentage to decimal
                    const l = parseFloat(match[3]) / 100; // Convert percentage to decimal
            
                    // Return an object with the HSL values
                    return { h, s, l };
                } else {
                    // Handle the case where the format does not match
                    console.error("Invalid HSL format");
                    return null;
                }
            }
            function addHex (id) {
                var hexInput = document.getElementById(id);
                var hue = hexInput.value
                hue = hexToRGB(hue);
                hue = RGBToHSL(hue.r, hue.g, hue.b);
                console.log("Hue: " + hue);
                var colors = [
                    "hsl("+hue+", 9.544%, 99.544%)",
                    "hsl("+hue+", 28.386%, 95.886%)",
                    "hsl("+hue+", 44.535%, 89.535%)",
                    "hsl("+hue+", 58.56%, 81.06%)",
                    "hsl("+hue+", 70.711%, 70.711%)",
                    "hsl("+hue+", 81.06%, 58.56%)",
                    "hsl("+hue+", 89.535%, 44.535%)",
                    "hsl("+hue+", 95.886%, 28.386%)",
                    "hsl("+hue+", 99.544%, 9.544%)"
                ];
                var palette = document.createElement('div');
                palette.className = 'palette';
                document.body.appendChild(palette);
                    
                colors.forEach(color => {
                    colordiv(palette, color);
                });
            }
                function addColor() {
                    var colorInput = document.getElementById('colorInput');
                    var hue = parseInt(colorInput.value);
                    var colors = [
                        "hsl("+hue+", 9.544%, 99.544%)",
                        "hsl("+hue+", 28.386%, 95.886%)",
                        "hsl("+hue+", 44.535%, 89.535%)",
                        "hsl("+hue+", 58.56%, 81.06%)",
                        "hsl("+hue+", 70.711%, 70.711%)",
                        "hsl("+hue+", 81.06%, 58.56%)",
                        "hsl("+hue+", 89.535%, 44.535%)",
                        "hsl("+hue+", 95.886%, 28.386%)",
                        "hsl("+hue+", 99.544%, 9.544%)"
                    ];
                    var palette = document.createElement('div');
                    palette.className = 'palette';
                    document.body.appendChild(palette);
                    
                    colors.forEach(color => {
                        colordiv(palette, color);
                    });
            
                    colorInput.value = ''; // Clear input field
                }
            
                function colordiv(palette, color) {
                    var newColorDiv = document.createElement('div');
                    var textDiv = document.createElement('p');
                    var overlayDiv = document.createElement('div');
            
                    newColorDiv.className = 'color';
                    newColorDiv.style.backgroundColor = color;
                    palette.appendChild(newColorDiv);
            
                    overlayDiv.className = 'overlay';
                    overlayDiv.style.position = 'absolute';
                    overlayDiv.style.top = '0';
                    overlayDiv.style.left = '0';
                    overlayDiv.style.width = '100%';
                    overlayDiv.style.height = '100%';
                    overlayDiv.style.backgroundColor = '#000';
                    overlayDiv.style.color = '#fff';
                    overlayDiv.style.display = 'flex';
                    overlayDiv.style.zIndex = 2;
                    overlayDiv.style.fontSize = 10;
                    // overlayDiv.style.fontWeight = 1000;
                    overlayDiv.style.textAlign = 'center';
                    overlayDiv.style.alignItems = 'center';
                    overlayDiv.style.justifyContent = 'center';
                    overlayDiv.style.visibility = 'hidden';
                    overlayDiv.textContent = 'Copied to clipboard';
                    newColorDiv.appendChild(overlayDiv);
            
                    var parsed = parseHSL(color);
                    var hexColor = HSLToHex(parsed.h, parsed.s, parsed.l);
                    var textNode = document.createTextNode(hexColor);
                    textDiv.appendChild(textNode);
                    newColorDiv.appendChild(textDiv);
            
                    newColorDiv.addEventListener('click', function() {
                        copyToClipboard(hexColor, overlayDiv);
                    });
                }
            
                function copyToClipboard(text, overlay) {
                    navigator.clipboard.writeText(text).then(function() {
                        console.log('Copying to clipboard was successful!');
                        overlay.style.visibility = 'visible';
                        setTimeout(function() {
                            overlay.style.visibility = 'hidden';
                        }, 1500); // Hide the overlay after 1.5 seconds
                    }, function(err) {
                        console.error('Could not copy text: ', err);
                    });
                }
            