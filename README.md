# CDK Construct to create AWS Config Conformance Pack for common best practices

A conformance pack is a collection of AWS Config rules and remediation actions that can be easily deployed as a single entity in an account and a Region or across an organization in AWS Organizations.

This CDK Construct included some Conformance Pack for best practices with Config managed rules.

## Conformance Pack

### RDS Best practices

Subset of security best practices for Amazon RDS Conformance Packs. Full set of the rules can be found in [AWS Config github repository](https://github.com/awslabs/aws-config-rules/blob/master/aws-config-conformance-packs/Security-Best-Practices-for-RDS.yaml).

#### RDS_INSTANCE_PUBLIC_ACCESS_CHECK
Make sure the RDS is in the isolated subnet [1].

#### RDS_STORAGE_ENCRYPTED
RDS has encryption of data at rest [2].

### Example usage

Conformance Pack Name: `CdkConstructSecuredResourcesConfig.rdsBestPracticesComformancePack`

```
const config = new CdkConstructSecuredResourcesConfig(this, `${stack_id}-config`,{
    conformancePacks: [CdkConstructSecuredResourcesConfig.rdsBestPracticesComformancePack],
    configDeliveryS3Bucket: cdk.aws_s3.Bucket.fromBucketArn(this, `${stack_id}-config-s3`, s3BucketForConfig)  
});

```

## References
* [1]: Network-level security best practices for Amazon RDS
https://aws.amazon.com/blogs/database/security-best-practices-for-amazon-rds-for-mysql-and-mariadb-instances/
* [2]: Amazon RDS Security
https://aws.amazon.com/rds/features/security/#Encryption_of_Data_at_Rest