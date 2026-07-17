<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/15234276-0922-4224-a588-ea645df6d3c3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Editing the Resume

The HTML/CSS source for the resume is stored in `resume.html` at the root of the project. To reuse or modify it in the future:
1. Open `resume.html` and edit the HTML/CSS directly.
2. Generate the PDF using `wkhtmltopdf` (or any other HTML-to-PDF tool):
   ```bash
   wkhtmltopdf --enable-local-file-access resume.html public/Resume_Abhay_V3.pdf
   ```
3. Update the link in `src/components/Hero.tsx` if you rename the output file.
