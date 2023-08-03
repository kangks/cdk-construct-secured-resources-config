import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

export interface ConformancePacksType {
  readonly name: string,
  readonly templatePath: string,
  readonly resourceTypes: cdk.aws_config.ResourceType[]
}

export interface CdkConstructBestPracticesConfigConformanceProps {
  readonly conformancePacks: ConformancePacksType[],
  readonly configDeliveryS3Bucket: cdk.aws_s3.IBucket,
}

export class CdkConstructBestPracticesConfigConformance extends Construct {

  public static rdsBestPracticesComformancePack:ConformancePacksType = {
    name: "SecuredRDSBestPractices",
    templatePath: path.join(__dirname, '..', "config-packs/rds.bestpractices.yaml"),
    resourceTypes: [
      cdk.aws_config.ResourceType.RDS_DB_INSTANCE
    ]
  };    

  constructor(scope: Construct, id: string, props: CdkConstructBestPracticesConfigConformanceProps) {
    super(scope, id);

    const recorderResources:string[] = [];

    for(let conformancePack of props.conformancePacks){        
      const conformanceCreated = new cdk.aws_config.CfnConformancePack(this, `CP-${conformancePack.name}`, {
          conformancePackName: conformancePack.name,
          deliveryS3Bucket: props.configDeliveryS3Bucket.bucketName,
          deliveryS3KeyPrefix: conformancePack.name,
          templateBody: fs.readFileSync(conformancePack.templatePath).toString(),
          conformancePackInputParameters: [],      
      });

      conformancePack.resourceTypes.forEach(
        x=>recorderResources.concat(x.complianceResourceType)
      );

      new cdk.CfnOutput(this, `CP-${conformancePack.name}-out`,{
        description: `${conformancePack.name} name`,
        value: conformanceCreated.conformancePackName
      });
    };

    // createDeliveryIfNotExists();

    // new cdk.aws_config.CfnDeliveryChannel(
    //   this, `${id}-delivery`, <cdk.aws_config.CfnDeliveryChannelProps>{
    //     s3BucketName: props.configDeliveryS3Bucket.bucketName
    //   }
    // )

    // const recordingGroup = <cdk.aws_config.CfnConfigurationRecorder.RecordingGroupProperty>{
    //   resourceTypes: recorderResources
    // };

    // new cdk.aws_config.CfnConfigurationRecorder(this,`${id}-config-recorder`,<cdk.aws_config.CfnConfigurationRecorderProps>{
    //   recordingGroup: recordingGroup      
    // });
  }
}
// function createDeliveryIfNotExists() {
//   var configservice = new AWS.ConfigService();

//   throw new Error('Function not implemented.');
// }

