# Drupal 8

## Composer

For Drupal, the preferred way to manage the site and its modules is to [use composer](https://www.drupal.org/docs/develop/using-composer/using-composer-to-install-drupal-packages-through-drupalorg).

### Creating a new Drupal site with Composer

To create a new Drupal 8 site using composer you can make use the [Drupal Composer project](https://github.com/drupal-composer/drupal-project).

You will need composer installed on you machine, so as long as you have this, you can run:

    composer create-project drupal-composer/drupal-project:8.x-dev drupal8.dev --stability dev --no-interaction

This will create the Drupal 8 site within the directory: drupal8.dev.

The `composer create-project` command passes ownership of all files to the project 
that is created. You should create a new git repository, and commit all files not 
excluded by the .gitignore file.

This project specifies the docroot to be a directory called `web`. For this to work 
with other hosts that specifically want a directory called `docroot` (e.g. Acquia) 
then you can create a symlink of docroot to the web directory.

### Installing Drupal from composer

Having checked out an existing project from git, to setup the drupal site run the following  
command from the 'project root' (this is the directory above the docroot/ web directory).

    composer install
    
This will download the correct version of Drupal core and any contrib modules to the 
project as well as applying any patches that need to be applied.

### Downloading Modules

To download a module, rather than using Drush you should [use composer](https://www.drupal.org/docs/develop/using-composer/using-composer-to-install-drupal-packages-through-drupalorg).
As above, you will need to run the command from the project root.

    composer require drupal/[module_name]
    
e.g.

    composer require drupal/metatag
    
To ensure that the minimal stable version to be installed is alpha add `~1.0@alpha` 
to the end of the require statement:
 
e.g.
    
    composer require drupal/metatag:~1.0@alpha

> Although you can set the minimal stability within the composer file, this means 
that some contrib modules that only have a dev version can not be downloaded. 
Adding `~1.0@alpha` to the require statement will mean that the module that you 
are wanting to download is a minimum of alpha, but that any modules that it requires
could be dev releases.

### Updating modules

To update a module you can run the following command from the project root:

    composer update drupal/[module_name]
    
### Apply patches to downloaded modules

If you need to apply patches (depending on the project being modified, a pull 
request is often a better solution), you can do so with the 
[composer-patches](https://github.com/cweagans/composer-patches) plugin.

To add a patch to drupal module foobar insert the patches section in the `extra` 
section of composer.json:
```json
"extra": {
    "patches": {
        "drupal/foobar": {
            "Patch description": "URL to patch"
        }
    }
}
```

To the apply the patch, run the update composer command on the module which will
download the module and apply the patch for you.

## Settings files

### Default settings.php file

To fit with our best practice, the default settings file `(web/sites/default/settings.php`) 
should look like this:

```php
  <?php 
  
  /**
   * @file
   * Default Drupal configuration file sites/default/settings.php
   */
  
  /**
   * Map domains to environment types here.
   */
  $base_domains = array(
    'drupal8.dev' => 'local',
  );
  
  $platform = '';
  $instance = $_SERVER['HTTP_HOST'];
  $env = $base_domains[$_SERVER['HTTP_HOST']];
  
  /**
   * Specify the vdd settings file here.
   */ 
  $local_settings = '/var/www/settings/drupal8/settings.inc';
  if (file_exists($local_settings)) {
    include $local_settings;
    $platform = 'vdd';
  }
  
  if (!empty($env) && !empty($platform) && !empty($instance)) {
    define('SETTINGS_ENVIRONMENT', $env);
    define('SETTINGS_INSTANCE', $instance);
    define('SETTINGS_PLATFORM', $platform);
  
    foreach (glob('sites/default/settings/*.settings.inc') as $file) {
      require_once $file;
    }
  }
```

The above assumes that your project name is `drupal8`.
    
## Settings file configuration

From our default settings.php file, each module/ configuration type has its own
specific PHP settings.inc file. These files go into the directory: `web/sites/conf`.

As a minimum you should have two files for:

* Core settings
* Performance settings

### Core Settings

`01-core.settings.inc` needs to contain the following:

```php
  <?php
  
  /**
   * @file
   * Drupal core settings sites/conf/01-core.settings.inc
   */
          
  $config_directories = [];
  $config_directories[CONFIG_SYNC_DIRECTORY] = '../config/sync';
  $settings['update_free_access'] = FALSE;
          
  /**
   * Enable local development services.
   */
  if (SETTINGS_ENVIRONMENT === 'local') {
    $settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
  } else {
    $settings['container_yamls'][] = __DIR__ . '/services.yml';
  }
              
  /**
   * Show all error messages, with backtrace information.
   */
  if (SETTINGS_ENVIRONMENT === 'local') {
    $config['system.logging']['error_level'] = 'verbose';
  }
              
  /**
   * List all domain patterns this site should respond to, to prevent spoofing.
   */
  $settings['trusted_host_patterns'] = array(
    '^' . SETTINGS_INSTANCE .'$',
  );
              
  $settings['hash_salt'] = 'some-sufficiently-random-string';
```

You will notice that within the above settings file there is reference the development
services. The files `services.yml` and `development.services.yml` are provided by Drupal
core. There are however a few additional lines which are always good to add to the 
`development.services.yml` file. 

```
parameters:
  twig.config:
    debug: true
    auto-reload: true
    cache: false
```

These additional parameters enable twig debugging and disable the twig caching, 
so that you don't have to clear cache whenever you make a template change. 

Here is an example of how the file `development.services.yml` would look.

```
# Local development services.
#
# To activate this feature, follow the instructions at the top of the
# 'example.settings.local.php' file, which sits next to this file.
services:
  cache.backend.null:
    class: Drupal\Core\Cache\NullBackendFactory
parameters:
  twig.config:
    debug: true
    auto-reload: true
    cache: false
```

### Performance Settings

These performance settings are taken from the example.settings.local.php which is
shipped with Drupal. This enables these settings to be set for the local 
environment using our standard settings files structure. 

`02-performance.settings.inc` needs to contain the following:

```php
  <?php
  
  /**
   * @file
   * Drupal core settings sites/conf/performance.settings.inc
   */
              
  if (SETTINGS_ENVIRONMENT === 'local') {
    // This is the recommended setting value for running Drupal 8 with xdebug.
    ini_set('xdebug.max_nesting_level', 256);
              
    /**
     * Assertions.
     *
     * The Drupal project primarily uses runtime assertions to enforce the
     * expectations of the API by failing when incorrect calls are made by code
     * under development.
     *
     * @see http://php.net/assert
     * @see https://www.drupal.org/node/2492225
     *
     * If you are using PHP 7.0 it is strongly recommended that you set
     * zend.assertions=1 in the PHP.ini file (It cannot be changed from .htaccess
     * or runtime) on development machines and to 0 in production.
     *
     * @see https://wiki.php.net/rfc/expectations
     */
    assert_options(ASSERT_ACTIVE, TRUE);
    \Drupal\Component\Assertion\Handle::register();
              
    /**
     * Disable the render cache (this includes the page cache).
     *
     * Note: you should test with the render cache enabled, to ensure the correct
     * cacheability metadata is present. However, in the early stages of
     * development, you may want to disable it.
     *
     * This setting disables the render cache by using the Null cache back-end
     * defined by the development.services.yml file above.
     *
     * Do not use this setting until after the site is installed.
     */
    $settings['cache']['bins']['render'] = 'cache.backend.null';
              
    /**
     * Disable Dynamic Page Cache.
     *
     * Note: you should test with Dynamic Page Cache enabled, to ensure the correct
     * cacheability metadata is present (and hence the expected behavior). However,
     * in the early stages of development, you may want to disable it.
     */
    $settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
              
    /**
     * Allow test modules and themes to be installed.
     *
     * Drupal ignores test modules and themes by default for performance reasons.
     * During development it can be useful to install test extensions for debugging
     * purposes.
     */
    $settings['extension_discovery_scan_tests'] = TRUE;
              
    /**
     * Enable access to rebuild.php.
     *
     * This setting can be enabled to allow Drupal's php and database cached
     * storage to be cleared via the rebuild.php page. Access to this page can also
     * be gained by generating a query string from rebuild_token_calculator.sh and
     * using these parameters in a request to rebuild.php.
     */
    $settings['rebuild_access'] = TRUE;
              
    /**
     * Skip file system permissions hardening.
     *
     * The system module will periodically check the permissions of your site's
     * site directory to ensure that it is not writable by the website user. For
     * sites that are managed with a version control system, this can cause problems
     * when files in that directory such as settings.php are updated, because the
     * user pulling in the changes won't have permissions to modify files in the
     * directory.
     */
    $settings['skip_permissions_hardening'] = TRUE;
              
  }
              
  /**
   * Disable CSS and JS aggregation.
   */
  $config['system.performance']['css']['preprocess'] = (SETTINGS_ENVIRONMENT !== 'local');
  $config['system.performance']['js']['preprocess'] = (SETTINGS_ENVIRONMENT !== 'local');
```

## Drush alias configuration

These need to be defined in the file `web/drush/sites.aliases.drushrc.php`. 
Make sure drush is specified in the remote environment to be drush version 8.

```php
  <?php
  
  /**
   * @file
   * Drush environment aliases drush/sites.aliases.drushrc.php
   */
  
  $aliases['vdd'] = array(
    'env' => 'vdd',
    'uri' => 'deesond8.dev',
    'root' => '/var/www/vhosts/deesond8.dev/docroot',
    'path-aliases' => array(
      '%drush-script' => 'drush8',
    ),
  );
  
  if (!file_exists('/var/www/vhosts/deesond8.dev/docroot')) {
    $aliases['vdd']['remote-host'] = 'dev.local';
    $aliases['vdd']['remote-user'] = 'vagrant';
  }
```
    
## Installing Drupal
Easy, just run:

    drush @vdd si

## Clearing cache

    drush @vdd cr

## Configuration Management 

The drush commands are:

    drush @vdd cex

This exports the current site configuration into a configuration directory. This 
is the equivalent of doing a feature export in D7 but for all features.

    drush @vdd cim

This imports the current site configuration from a configuration directory. This 
is the equivalent of doing a features revert all.  It is also quick.

The import/export directory is defined as a settings.php setting which I recommend 
goes in `web/sites/conf/01-core.settings.inc`

    $config_directories[CONFIG_SYNC_DIRECTORY] = '../config/sync';

This provides a single export directory for site config which all environments 
would use. This directory is also outside of the docroot so that it is not 
accessible to the public.

We do not want to export configuration for some modules, for example devel. 
Modules configuration can be blacklisted from export and import via the drush 
configuration file stored at `web/drush/drushrc.php`. For example, the following excludes 
the devel module from both import and export operations:

```php
  <?php
  
  /**
   * @file
   * Drush configuration file drush/drushrc.php
   */
  
  $command_specific['config-export']['skip-modules'] = array('devel');
  $command_specific['config-import']['skip-modules'] = array('devel');
```  
    
[Reference](https://pantheon.io/blog/using-configuration-module-filter-drush-8)
     
## Configuration override system

Having only one export directory for all environments means that all environments 
would have the same configuration. This is fine for most cases, however we will 
occasionally want different configuration in prod to stage or dev or local.

In any of our `web/sites/conf/*.settings.inc` files we can specify overridden 
variables like this:

    if (SETTINGS_ENVIRONMENT === 'prod') {
      $config['system.site']['name'] = 'My Website';
    }
    else {
      $config['system.site']['name'] = SETTINGS_ENVIRONMENT . ': My Website';
    }

[Reference](https://www.drupal.org/node/1928898)

## Custom and Contrib modules

The composer.json file defines that the contrib modules are located in the 
folder: *modules/contrib*, while the custom modules are located in the folder: 
*modules/custom*.

## Defining modules per environment configuration

@todo: This is how we define which modules should be enabled in each environment. 
This is the equivalent of how we use the Master module in D7.

I think there is a need for master in Drupal 8 as I can’t see a way to specify a 
module only in one environment.  Section 5 above describes how to prevent configuration 
for development modules escaping to live but we’ve nothing to have modules only 
enable in live or to remove unwanted modules from live.
Master module discussion: https://www.drupal.org/node/2397817 

## How to write a plugin

@todo - might just reference docs and say when plugins are appropriate

## Creating a Theme and SubTheme

@todo Need to put in the frontend folder and link it into the bootstrap subtheme.

## Updating Drupal

Updating Drupal core can be done via composer update command as detailed above.
