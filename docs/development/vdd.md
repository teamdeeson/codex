## Development conventions

For best results, your MacBook Pro should be setup as follows. We faviour convention over configuration, so these are
the conventions...

#### Sites directory

All your projects should be checked out as sub folders in the `~/Sites` directory

#### VDD installation directory

We use our own version of VDD, a vagrant tool for running our websites locally.  VDD should be installed to
`~/Applications/vdd`. More on VDD later.

#### Project short codes

All projects should have a shortcode defined in their project README.md file in the root of
the project repository. This should be a machine name for the project (e.g. deeson is a good shortcode for the
deeson website project). The short code gets used in a number of places, for example we expect the project to get
checked out to `~/Sites/[shortcode].dev` on your local machine, the local database will have the name of the short code.

## VDD

Congratulations on your choice of local development environment. With the Deeson modified VDD you have many hours of
development pleasure ahead of you.

VDD is Vagrant Drupal Development and started life in the wilds of the internet. We have captured and made it
significantly better. So don't read the online docs about VDD as they are probably no longer relevant to the Deeson
version.

First time setup instructions can be seen on the [Deeson vdd project README](https://github.com/teamdeeson/vdd)