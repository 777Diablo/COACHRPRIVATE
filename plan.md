# CoachR

- AUTH PAGES
- User Management
  - Roles - admin, staff, coach, Organization, user
  - permission (predefined)
  - add users with roles & permissions
- PROGRAMS
  - Interview
  - Video Interview (recorded)
  - Video call Interview
  - Psycometric Test

MODELS

- users/auth
- accounts
- roles
- permissions (JSON file)
- programs
- program bundles
- program bundle details

- AUth page

  - login UI

- add hids_component

---

End User ll have default routes start with '/'

Admin have routes start with '/admin'
Staff have routes start with '/admin'

Coach have routes start with '/coach'

# TODO

# ===================================================================

# PreRequisites

- create programs
- create coach
- create questions & question set

# ===================================================================

## USER FLOW

### for new User

- user creates a inquiry
- inquiry is shown to staff user
- staff user creates account for user's behalf and place an order then send reset password link
- user completes the order (payment)
- if video call interview (1:1) is selected
  - user chooses a timeslot
  - staff assigns a coach to the user - order
  - an interview is scheduled - time/date/link (order)
  - user & coach joins the interview
  - interview is recorded
  - interview is transcribed
  - coach provides feedback report
  - report is sent to user
- if video based interview is selected
  - user can start at any time
  - user's video is captured (till the end of the interview)
  - video is recorded & transcribed
  - staff assigns a coach to the user
  - coach creates a feedback report
  - report is sent to user

### for existing User

- user can directly place order (paymnet)
- same as above

---

- register

  - after creating account redirects to dashboard
  - after logout - redirect to login page

- courses
  - before buying - check login

<!-- TODO -->

- payment model removed - so handle all payment related things in order
- orderItem model added - handle multiple items in an order
- programEnrollment model added - enrollment details are seperated from model
-

=========================================================

- show videos to coach - take feedback
- show details to user

Video call interview
Coach A - 10 11
Coach B - 10 11

Coach - will create their slots
Show all the available slots to user
once user selects a slot - send notification to coach
staff ll generate the meeting link
show the meeting link to user and coach
after/on-going the interview - coach ll give feedback to user
recorded video is stored in google cloud - then copy the link and add here
