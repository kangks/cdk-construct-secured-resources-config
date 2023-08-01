import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import path = require('path');

interface ComformancePacksType {
  name: string,
  templatePath: string
}

export interface CdkConstructSecuredResourcesConfigProps {
  comformancePacks: ComformancePacksType[],
  configDeliveryS3Bucket: cdk.aws_s3.IBucket
}

export class CdkConstructSecuredResourcesConfig extends Construct {

  public static rdsBestPracticesComformancePack:ComformancePacksType = {
    name: "SecuredRDSBestPractices",
    templatePath: "config-packs/rds.bestpractices.yaml"
  };    

  constructor(scope: Construct, id: string, props: CdkConstructSecuredResourcesConfigProps) {
    super(scope, id);

    for(let comformancePack of props.comformancePacks){        
      const conformancePack = new cdk.aws_config.CfnConformancePack(this, `CP-${comformancePack.name}`, {
          conformancePackName: comformancePack.name,
          deliveryS3Bucket: props.configDeliveryS3Bucket.bucketName,
          deliveryS3KeyPrefix: comformancePack.name,
          templateBody: fs.readFileSync(path.join(__dirname, '..', comformancePack.templatePath)).toString(),
          conformancePackInputParameters: [],      
      });

      new cdk.CfnOutput(this, `CP-${comformancePack.name}-out`,{
        description: `${comformancePack.name} name`,
        value: conformancePack.conformancePackName
      });
    }
  }
}
