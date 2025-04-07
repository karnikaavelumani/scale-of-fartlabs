import { Router } from "@fartlabs/rt";
import { renderPage } from "./renderPage.tsx";

// Set up the router to respond to requests at the root URL
const router = new Router().get("/", () => renderPage());

// Start the server to handle incoming requests
Deno.serve((request) => router.fetch(request));
