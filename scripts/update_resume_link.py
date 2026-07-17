#!/usr/bin/env python3
"""
This script safely updates the links inside your PDF resume to include 
a UTM tracking parameter (e.g. ?utm_source=resume_pdf) without breaking 
the PDF's layout or internal formatting.

Requires PyMuPDF:
$ pip install PyMuPDF
"""

import fitz  # PyMuPDF
import argparse
import os

def update_pdf_link(input_pdf, output_pdf, target_domain, utm_source):
    if not os.path.exists(input_pdf):
        print(f"Error: Could not find '{input_pdf}'")
        return

    doc = fitz.open(input_pdf)
    changed = False

    print(f"Scanning '{input_pdf}' for links to '{target_domain}'...")
    
    for page_num, page in enumerate(doc, 1):
        for link in page.links():
            uri = link.get("uri")
            if uri and target_domain in uri:
                new_uri = uri
                
                # Check to prevent adding duplicate utm parameters
                if f"utm_source={utm_source}" not in new_uri:
                    if "?" in new_uri:
                        new_uri += f"&utm_source={utm_source}"
                    else:
                        new_uri += f"?utm_source={utm_source}"
                    
                    # Safely update the link in PyMuPDF by deleting and re-inserting
                    new_link = dict(link)
                    new_link["uri"] = new_uri
                    page.delete_link(link)
                    page.insert_link(new_link)
                    
                    print(f" -> Page {page_num}: Updated link to '{new_uri}'")
                    changed = True

    if changed:
        doc.save(output_pdf)
        print(f"\n✅ Success! Saved updated resume to: {output_pdf}")
    else:
        print(f"\n⚠️ No links found matching '{target_domain}', or they were already updated.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Update portfolio links in a resume PDF to include a UTM source tracker.")
    parser.add_argument("--input", default="public/Resume_Abhay_Updated.pdf", help="Path to original PDF")
    parser.add_argument("--output", default="public/Resume_Abhay_V2.pdf", help="Path to save updated PDF")
    parser.add_argument("--domain", default="abhaybisht.com", help="Domain to target inside the PDF links")
    parser.add_argument("--utm", default="resume_pdf", help="The utm_source value to append")
    
    args = parser.parse_args()
    update_pdf_link(args.input, args.output, args.domain, args.utm)
