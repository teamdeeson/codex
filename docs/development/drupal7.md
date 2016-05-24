## Configuration management

#### Features

We use the [Features module](https://drupal.org/project/features) to export configuration to code so it can be stored
in version control.  On deployment, our deployment processes revert all features to their code based state so any changes
made on an environment will be lost on the next deployment if they have not been exported to code.

Features configuration should be exported to a module located in the `sites/all/modules/custom` folder.

Features modules on a site should have some logical organisation. A typical strategy for organising your Drupal Features
is to create a feature module for different features of your site that a user will interact with. Using the analogy of a
blog feature, you might export into your blog feature module the configuration for content types, fields, views,
pathauto settings and whatever else is required to make the blog feature work. This is typically enough for a site.

A more complex strategy is the shared dependencies approach where we export base components, like field_bases, into a set
of base modules. Drupal Features still follows the traditional approach and we may have feature modules for our blog,
news, etc. Common components of our top tier of features are moved into the lowest tier. Thus the lowest tier is a
series of Drupal Feature modules which group together common components from the top tiers.  This has the advantage of
smaller feature modules which are easy to manage and is good for larger more complex sites.

#### Variables

All variables should be stored using Features (via strongarm) unless:

1. they need to be controlled by some kind of per-environment logic.
2. they are so unbelievably important that you shouldn't ever be able to change them from the UI (Acquia purge settings).
3. you are really sure its better to be in the conf file.

Deeson have devised our own [Drupal Settings File Strategy](https://www.deeson.co.uk/labs/site-configuration-strategy-or-how-manage-your-settingsphp-files)

Settings files are stored in `sites/all/conf*.settings.inc` with a separate files for each sub module which needs
configuration storing like this. This keeps the settings neatly separated.  The following environment variables should
be available within the settings files allowing switches in code to set different configuration based on:

The following `ENVIRONMENT VARIABLES` are always available within these settings files:

| Environment variable | Type       | Value(s)                                      |
|----------------------|------------|-----------------------------------------------|
| SETTINGS_ENVIRONMENT | string     | 'local', 'dev', 'test' or 'prod'              |
| SETTINGS_INSTANCE    | string     | Domain, e.g. 'mysite.dev' or 'www.mysite.org' |
| SETTINGS_PLATFORM    | string     | either 'pulsant' or 'vdd'                     |
