Implemented methods:

**CORE**
- GetInstance
- ListInstances
- InstanceAction
- ListVnicAttachments
- GetVnic

**IAM**
- ListCompartments


## Test

To test the API, create a `test/data/testData.json` file populated with the following content:

```json
{
    "client": {
        "userID": "ocid1.user.oc1..xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "fingerprint": "66:7yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
        "tenantID": "ocid1.tenaxxxxxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
        "zone": "eu-frankfurt-1",
        "keyPath": "/path/to/oci_api_key.pem"
    },
    "testInstance": {
        "compartmentId": "ocid1.compartment.oc1..qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
        "instanceId": "ocid1.instance.oc1.eu-frankfurt-1.wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "vnicId": "ocid1.vnic.oc1.eu-frankfurt-1.eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    }
}
```

Note that tests for POST APIs are skipped by default.
