# Hosting clients' sites on non-standard environments

## The problem
We specialise in building software applications and are not keen to build / manage the infrastructure which the applications run on. Also our support arrangements do not allow us to respond swiftly to infrastructure issues should they arise outside of our business hours. 

This is why we prefer to use Platform as a Service providers (PaaS) that are fine-tuned for Drupal to minimise the risk of us getting involved in troubleshooting infrastructure issues.

In the past, we have had issues with clients who preferred to host their infrastructure in-house. Here are some of the examples:
absence of a solid deployment process

- unclear responsibilities around deployment mechanisms
- unclear responsibilities over emerging issues post-launch
- unclear responsibilities for monitoring, backups security and performance governance
- unclear responsibilities for fixes and security patches of the OS and server applications
- issues connecting to their infrastructure (VPN issues / denied from accessing their infrastructure / conflicting IT security policies on 3rd party access)
- lack of sufficient logging / not being able to access error logs 
- clients misunderstanding infrastructure issues as application issues
- inconsistencies between non-prod / prod environments, which results in bugs that are not reliably reproducible on all environments

We often ended up spending time helping with troubleshooting / fixing their infrastructure issues. However, the hours we spent on the troubleshooting efforts can’t be quoted upfront and so are hard for us to charge to a client. Us spending time on unscheduled non-development tasks also affected the delivery schedule, and as a result, both us and the client were put under pressure to deliver the project overall.

## Our solutions

**For all clients who prefer to run their application on a custom infrastructure**, we notify them up-front that a Statement of Work needs to be signed that outlines the risks, costs and responsibilities of this route, as well as pre-paid hosting support pack of at least 50 hours must be put in place in advance before we agree to work with custom infrastructure. This pack is for Deeson team members resolving hosting related issues OR extra work required as a result of the use of custom infrastructure. We must also ensure the client is aware that this approach can affect delivery timelines if unforeseen issues arise that we have to troubleshoot. We work on a “best efforts” basis for custom infrastructure troubleshooting and so we can’t provide any guarantees of timescales for resolving the issues.  

**For clients who prefer to set up their own infrastructure**, we will require them to hire and work directly with a third-party infrastructure specialist who is experienced in building fine-tuned platforms for hosting specific technology (e.g. Drupal). We fully expect them to provide us with a platform with a toolset that would allow us to deploy and manage the applications (e.g. ideal directory structure with correct permissions, drush, git etc.). We can produce a list of required packages upon request; however, should any infrastructure issues arise, the client must contact and work with the third-party infrastructure specialist to solve the issues. We make it clear that we won’t be helping them with the setup, configuration and maintenance of the infrastructure, as well as troubleshooting.

**For clients who require a custom infrastructure but do not want to maintain it**, we will recommend them to work directly with a hosting company who have experience building and hosting fine-tuned platforms for hosting specific technology (e.g. Drupal). We fully expect them to provide us with a platform with a toolset that would allow us to deploy and manage the applications (e.g. ideal directory structure with correct permissions, drush, git etc.). Should any infrastructure issues arise, the client must contact and work with them to solve the issues. We make it clear that we won’t be helping them with the setup, configuration and maintenance of the infrastructure, as well as troubleshooting.

**For clients who have their own infrastructure and complex build process that disallow us from accessing the environments**, we need to ensure that they understand the limitation of our ability to troubleshoot and accept that the limitation can ultimately affect the delivery timeline.
