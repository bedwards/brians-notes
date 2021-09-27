# Elastic Observability

* [https://www.elastic.co/observability](https://www.elastic.co/observability)

# Logs

# Metrics

My goal is to send statsd metrics from a node app to Elastic Stack. Elastic has a [free training course](https://learn.elastic.co/learn/course/391/play/1428:844/lesson-1-elastic-observability) with a lab feature that gives instructions on how to deploy an Elastic Stack.

Install [Metricbeat](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation-configuration.html)

```
curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-7.15.0-darwin-x86_64.tar.gz
tar xzvf metricbeat-7.15.0-darwin-x86_64.tar.gz
cd metricbeat-7.15.0-darwin-x86_64
./metricbeat modules enable statsd
```

Edit `./metricbeat.yml` to set these two fields. You get the values from the Elastic Service you deployed (Manage deployments link in the UI.) The username and password are presented on the screen while you create your deployment.

```
cloud.id: "<copy/paste from Elastic Deployments UI>"
cloud.auth: "<username>:<password>"
```

and comment out various lines :-(

```
# setup.kibana:
...
# output.elasticsearch:
  # hosts: ["localhost:9200"]
```

Edit `./modules.d/statsd.yml`

```
  enabled: true
```

Then you can successfully...

```
$ metricbeat setup -e
Kibana url: https://***.us-central1.gcp.cloud.es.io:443
Kibana dashboards successfully loaded.
Loaded dashboards
```

```
$ sudo chown -R root *
$ sudo ./metricbeat -e
```

# Application Performance Management
