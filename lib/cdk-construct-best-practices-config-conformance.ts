import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import path = require('path');

export interface ConformancePacksType {
  readonly name: string,
  readonly templatePath: string
}

export interface CdkConstructBestPracticesConfigConformanceProps {
  readonly conformancePacks: ConformancePacksType[],
  readonly configDeliveryS3Bucket: cdk.aws_s3.IBucket
}

export class CdkConstructBestPracticesConfigConformance extends Construct {

  public static rdsBestPracticesComformancePack:ConformancePacksType = {
    name: "SecuredRDSBestPractices",
    templatePath: path.join(__dirname, '..', "config-packs/rds.bestpractices.yaml")
  };    

  constructor(scope: Construct, id: string, props: CdkConstructBestPracticesConfigConformanceProps) {
    super(scope, id);

    for(let conformancePack of props.conformancePacks){        
      const conformanceCreated = new cdk.aws_config.CfnConformancePack(this, `CP-${conformancePack.name}`, {
          conformancePackName: conformancePack.name,
          deliveryS3Bucket: props.configDeliveryS3Bucket.bucketName,
          deliveryS3KeyPrefix: conformancePack.name,
          templateBody: fs.readFileSync(conformancePack.templatePath).toString(),
          conformancePackInputParameters: [],      
      });

      new cdk.CfnOutput(this, `CP-${conformancePack.name}-out`,{
        description: `${conformancePack.name} name`,
        value: conformanceCreated.conformancePackName
      });
    }
  }
}
