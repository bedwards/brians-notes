# Elastic Observability

* [https://www.elastic.co/observability](https://www.elastic.co/observability)

# Logs

# Metrics

My goal is to send statsd metrics from a node app to Elastic Stack. Elastic has a [free training course](https://learn.elastic.co/learn/course/391/play/1428:844/lesson-1-elastic-observability) with a lab feature that gives instructions on how to deploy an Elastic Stack.

Install [Metricbeat](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation-configuration.html)

```
brew tap elastic/tap
brew install elastic/tap/metricbeat-full
metricbeat modules enable statsd
```

Edit `/usr/local/etc/metricbeat/metricbeat.yml` to set these two fields. You get the values from the Elastic Service you deployed (Manage deployments link in the UI.) The username and password are presented on the screen while you create your deployment.

```
cloud.id: "<copy/paste from Elastic Deployments UI>"
cloud.auth: "<username>:<password>"
```

# Application Performance Management
