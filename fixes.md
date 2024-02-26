# Sineism website - comments 16-Feb-24

1. From the spec: Signing up shall involve payment of a configurable amount via PayPal. This payment will allow the user to log in and read the contents of the site indefinitely. The signup payment buys the user n comments (n is configurable).

- [x]  Add purchase phase for registration
- [x]  Add settings field for the registration payment amount

2. From the Spec: All buttons text, page titles, site title, etc. shall be editable by us.

- [x] Editing will be done from the codebase.

3. The response is very slow - will it be different in the actual site? This becomes more of a problem because there is no indication that a button was pressed and some process is taking place in the background.

- [ ] Basic optimization
- [ ] Button loading indicator

The image should be the background for the main screen

B. The utterances page: 4. From the spec: The numbering will start from a configurable number (e.g. 31).
Done

5. The possibility to move to next or previous page needs to be also at the bottom of the page (also part of the spec)
   Add buttons to the bottom as well

6. The buttons <next page> and <previous page> need to be in the same location always; if any is irrelevant it should be greyed out.
   Dont hide the buttons

7. The Go-to bookmark button remembers the page the utterance was when it was bookmarked - if the number of utterances per page is changed the bookmark is not remembered properly.
   Cursor bookmark

8. When creating posts, the default target should be Utterances

C. The Create responses popup: 9. First should appear the utterances responded, then the response text.
Make the post selection field first

10. Another option for the utterance responded should be: #
    Hard coded option for general comment (maked as #)

11. When listing the utterances there, the utterance number should be used, not the title
    Only the id

12. After finishing creating a response, the response creation popup should be removed, revealing the response created.
    Close the popup and navigate to the page where the comment is

13. From the spec: the text that requests the user to provide the utterances numbers should be: תגובה על אילו אמירות? (# לתגובה כללית)
    Add label on top of the field

D. The Responses page 14. Comment 5 above 15. Comment 6 above 16. Comments 7 above (if behaves similarly)

DONT DELETE THE DATA
