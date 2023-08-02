# CDK Construct to create AWS Config Conformance Pack for common best practices

A conformance pack is a collection of AWS Config rules and remediation actions that can be easily deployed as a single entity in an account and a Region or across an organization in AWS Organizations.

This CDK Construct included some Conformance Pack for best practices with Config managed rules.

## RDS Best practices

A good practices for securing RDS is to make sure the RDS is at the isolated subnet [1], and has encryption of data at rest [2].

## References
[1]: Network-level security best practices for Amazon RDS
https://aws.amazon.com/blogs/database/security-best-practices-for-amazon-rds-for-mysql-and-mariadb-instances/
[2]: Amazon RDS Security
https://aws.amazon.com/rds/features/security/#Encryption_of_Data_at_Rest