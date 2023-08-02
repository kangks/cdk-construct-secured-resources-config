import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CdkConstructSecuredResourcesConfig from '../lib/index';

test('Conformance Pack Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  const stackProps:CdkConstructSecuredResourcesConfig.CdkConstructSecuredResourcesConfigProps={
    conformancePacks: [],
    configDeliveryS3Bucket: new cdk.aws_s3.Bucket(stack,"mockS3")
  };
  // WHEN
  new CdkConstructSecuredResourcesConfig.CdkConstructSecuredResourcesConfig(stack, 'MyTestConstruct',stackProps);
  // THEN
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::Config::ConformancePack', 0);
});

test('Rules Created', () => { 
    const app = new cdk.App();
    const stack = new cdk.Stack(app, "TestStack");
    const conformancePack = CdkConstructSecuredResourcesConfig.CdkConstructSecuredResourcesConfig.rdsBestPracticesComformancePack;
    const stackProps:CdkConstructSecuredResourcesConfig.CdkConstructSecuredResourcesConfigProps={
        conformancePacks: [conformancePack],
      configDeliveryS3Bucket: new cdk.aws_s3.Bucket(stack,"mockS3")
    };
    // WHEN
    new CdkConstructSecuredResourcesConfig.CdkConstructSecuredResourcesConfig(stack, 'MyTestConstruct',stackProps);
    // THEN
    const template = Template.fromStack(stack);
  
    template.resourceCountIs('AWS::Config::ConformancePack', 1);
    template.hasResourceProperties('AWS::Config::ConformancePack', {
      ConformancePackName: conformancePack.name
    });
  });
  