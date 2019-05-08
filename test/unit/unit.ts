import { Client } from '../../src'
import * as chaiMiddleware from 'chai-as-promised'
import * as chai from 'chai'

const config = require('../data/testData.json')

chai.use(chaiMiddleware)
const expect = chai.expect

const client = new Client(config.client);

const testCompartmentId = config.testInstance.compartmentId
const testInstanceId = config.testInstance.instanceId
const testVnicId = config.testInstance.vnicId

describe('Core', () => {
    it('should get the instance', async () => {
        const instance = await client.Core.GetInstance(testInstanceId)
        expect(instance.id).to.not.equal('')
    });
    it('should list instances', async () => {
        const instances = await client.Core.ListIntances(testCompartmentId)
        expect(instances.length).to.not.equal(0)
    })
    it.skip('should stop an instance', async () => {
        const response = await client.Core.InstanceAction(testInstanceId, 'SOFTSTOP')
    })
    it.skip('should start an instance', async () => {
        const response = await client.Core.InstanceAction(testInstanceId, 'START')
    })
    it('should list VNIC attachments for the compartment without specifying instance', async () => {
        const response = await client.Core.ListVnicAttachments(testCompartmentId)
        expect(response.length).to.equal(0)
    })
    it('should list VNIC attachments for the specific instance', async () => {
        const response = await client.Core.ListVnicAttachments(testCompartmentId, testInstanceId)
        expect(response.length).not.to.equal(0)
    })
    it('should get a VNIC attachment', async () => {
        const response = await client.Core.GetVnic(testVnicId)
        expect(response.publicIp).to.not.equal('')
    })

})

describe('IAM', () => {
    it('should list compartments', async () => {
        const response = await client.IAM.ListCompartments()
        expect(response.length).to.not.equal(0)
    })
})
