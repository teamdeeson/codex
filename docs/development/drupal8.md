# Drupal 8

## Default settings.php file

This is the file at sites/default/settings.php and should look like this to match out best practices.

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
      'drupal8.dev:8081' => 'local',
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
    
## Settings file configuration

Specific PHP settings.inc files to go into sites/default/settings.

As a minimum, 01-core.settings.inc needs to contain the following

    <?php
    
    /**
     * @file
     * Drupal core settings sites/default/settings/01-core.settings.inc
     */
    
    $settings['container_yamls'][] = __DIR__ . '/services.yml';
    
    /**
     * List all domain patterns this site should respond to, to prevent spoofing.
     */
    $settings['trusted_host_patterns'] = array(
      '^drupal8\.dev$',
    );
    
    $settings['hash_salt'] = 'some-sufficiently-random-string';
    
    $config_directories['sync'] = 'sites/default/config';

## Drush alias configuration

In the file drush/sites.aliases.drushrc.php. Make sure drush is specified in the remote environment to be drush version 8.

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
    
## Installing Drupal
Easy, just run:

    vendor/bin/drush @vdd si

## Clearing cache

    drush @vdd cr

## Configuration Management 

The drush commands are:

    drush @vdd cex

This exports the current site configuration into a configuration directory. This is the equivalent of doing a feature export in D7 but for all features.

     drush @vdd cim

This imports the current site configuration from a configuration directory. This is the equivalent of doing a features revert all.  It is also quick.

The import/export directory is defined as a settings.php setting which I recommend goes in sites/default/settings/01-core.settings.inc

    $config_directories['sync'] = 'sites/default/config';

This provides a single export directory for site config which all environments would use. 

We do not want to export configuration for some modules, for example devel. Modules configuration can be blacklisted from export and import via the drush configuration file stored at drush/drushrc.php. For example, the following excludes the devel module from both import and export operations:

    <?php
    
    /**
     * @file
     * Drush configuration file drush/drushrc.php
     */
    
    $command_specific['config-export']['skip-modules'] = array('devel');
    $command_specific['config-import']['skip-modules'] = array('devel');
    
[reference](https://pantheon.io/blog/using-configuration-module-filter-drush-8)
     
## Configuration override system

Having only one export directory for all environments means that all environments would have the same configuration. This is fine for most cases, however we will occasionally want different configuration in prod to stage or dev or local.

In any of our sites/default/settings/*.settings.inc files we can specify overridden variables like this:

    if (SETTINGS_ENVIRONMENT === 'prod') {
      $config['system.site']['name'] = 'My Website';
    }
    else {
      $config['system.site']['name'] = SETTINGS_ENVIRONMENT . ': My Website';
    }

[Reference](https://www.drupal.org/node/1928898)

## Custom and Contrib modules

Custom modules should be located in the folder modules/custom
Contrib modules should be located in the folder modules/contrib
The following line must be added to drush/drushrc.php to ensure contrib modules end up in the right folder

    $command_specific['dl'] = array('destination' => 'modules/contrib');

## Defining modules per environment configuration

@todo: This is how we define which modules should be enabled in each environment. This is the equivalent of how we use the Master module in D7.

I think there is a need for master in Drupal 8 as I can’t see a way to specify a module only in one environment.  Section 5 above describes how to prevent configuration for development modules escaping to live but we’ve nothing to have modules only enable in live or to remove unwanted modules from live.
Master module discussion: https://www.drupal.org/node/2397817 

## How to write a plugin

@todo - might just reference docs and say when plugins are appropriate

## Creating a Theme and SubTheme

@todo Need to put in the frontend folder and link it into the bootstrap subtheme.

## Updating Drupal

Updating Drupal core can be done via:

    drush @vdd up drupal
