HTTP Authentication
---
Secure passwords are important, everyone knows that, but we only use HTTP auth on our sites to keep accidental link shares and search engines away so we don't need super-secure credentials on these sites. It's much better if we can come up with something that our clients can remember - they'll thank us for it later. 

When you're setting a site up, make sure that you do enable HTTP authentication (on Pantheon this is in the control panel, Acquia it's via the Shield module and custom hosting requires a custom solution) for the any non-production URLs. Use these guidelines when setting the auth details:

* Pick a simple username. The clients name or abbreviation is fine
* Pick a password that's not easy to guess, but is easy to remember. So a single, random and non-relevant word will be fine. Use something like this: http://preshing.com/20110811/xkcd-password-generator/
* Use the same username/password combination for all sites owned by one client. (Unless the client doesn't want you to do this)
* Always try to share pre-authenticated URLs: `https://username:password@example.com/some/page`
