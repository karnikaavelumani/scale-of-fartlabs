// Function to load objects from the JSON file
async function loadObjects(): Promise<any[]> {
  const data = await Deno.readTextFile("./objects.json"); // Read the JSON file as text
  return JSON.parse(data); // Parse the JSON string into an object
}

// Function to generate and return the HTML page
export async function renderPage(): Promise<Response> {
  const objects = await loadObjects(); // Load the objects from the JSON file

  const pageContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Scale of the Universe</title>
        <!-- Correctly Import fart.css from fart.tools -->
        <link
          rel="stylesheet"
          type="text/css"
          href="https://css.fart.tools"
        />
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            let container = document.getElementById("scale-container");
            let scaleInput = document.getElementById("scale-range");
            
            scaleInput.addEventListener("input", function() {
              let scaleValue = parseFloat(scaleInput.value);
              container.style.transform = "scale(" + scaleValue + ")";
              container.dataset.scale = scaleValue;
            });
          });
        </script>
      </head>
      <body>
        <main>
          <h1>Scale of the Universe</h1>
          <div id="scale-container" data-scale="1" class="scale-container">
            ${
    objects.map((obj) =>
      `<div class="object" style="font-size: ${
        Math.log10(obj.size) * 10
      }px">${obj.name}</div>`
    ).join("")
  }
          </div>
          <input id="scale-range" type="range" min="0.1" max="10" step="0.1" value="1" class="scale-range" />
        </main>
      </body>
    </html>
  `;

  return new Response(pageContent, {
    headers: { "Content-Type": "text/html" },
  });
}
