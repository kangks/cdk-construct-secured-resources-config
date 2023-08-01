import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import path = require('path');

interface ConformancePacksType {
  name: string,
  templatePath: string
}

export interface CdkConstructSecuredResourcesConfigProps {
  conformancePacks: ConformancePacksType[],
  configDeliveryS3Bucket: cdk.aws_s3.IBucket
}

export class CdkConstructSecuredResourcesConfig extends Construct {

  public static rdsBestPracticesComformancePack:ConformancePacksType = {
    name: "SecuredRDSBestPractices",
    templatePath: "config-packs/rds.bestpractices.yaml"
  };    

  constructor(scope: Construct, id: string, props: CdkConstructSecuredResourcesConfigProps) {
    super(scope, id);

    for(let conformancePack of props.conformancePacks){        
      const conformanceCreated = new cdk.aws_config.CfnConformancePack(this, `CP-${conformancePack.name}`, {
          conformancePackName: conformancePack.name,
          deliveryS3Bucket: props.configDeliveryS3Bucket.bucketName,
          deliveryS3KeyPrefix: conformancePack.name,
          templateBody: fs.readFileSync(path.join(__dirname, '..', conformancePack.templatePath)).toString(),
          conformancePackInputParameters: [],      
      });

      new cdk.CfnOutput(this, `CP-${conformancePack.name}-out`,{
        description: `${conformancePack.name} name`,
        value: conformanceCreated.conformancePackName
      });
    }
  }
}
