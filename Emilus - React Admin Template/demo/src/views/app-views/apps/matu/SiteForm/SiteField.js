import React, { useState } from 'react';
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select,Button } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { LoadingOutlined } from '@ant-design/icons';

//import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';



const { Dragger } = Upload;
const { Option } = Select;

const rules = {
	liblle: [
		{
			required: true,
			message: 'le raison sociale de site est obligatoire',
		}
	],
	remarque: [
		{
			//required: true,
			message: 'Merci de choisir la remarque concernant (Matériel - site...)',
		}
	],
	email: [
		{
			required: true,
			message: 'Email est obligatoire',
		}
	],
	code_site: [
		{
			required: true,
			message: 'le  code site est obligatoir',
		}
	],
	comparePrice: [
	],
	taxRate: [
		{
			required: true,
			message: 'Please enter tax rate',
		}
	],
	cost: [
		{
			required: true,
			message: 'Please enter item cost',
		}
	]
}

const imageUploadProps = {
	name: 'file',
	multiple: true,
	listType: "picture-card",
	showUploadList: false,
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
}




const beforeUpload = file => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
}

//const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices'
const zones = ['sud', 'nord', 'west', 'ost']
const responsables = ['Malaoui - Taoufik ', 'Driss Oubeki', 'Kamal - Sdiri', 'Mourad - Khoudali']
const etat_decharge = ['Oui', 'Non']
// const [fileList, setfileList] = [];
// const [uploading, setuploading] = (0);//--false;
 const state = {
    fileList: [],
    uploading: false,
  }; 
  const { uploading, fileList } = state;


 const  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

   this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  };
 





const props = {
  onRemove: file => {
	this.setState(state => {
	  const index =  state.fileList.indexOf(file);
	  const newFileList = state.fileList.slice();
	  newFileList.splice(index, 1);
	  return {
		fileList: newFileList,
		//setfileList(newFileList);
	  };
	});
  },
  beforeUpload: file => {
	this.setState(state => ({
	  fileList: [...state.fileList, file],
	}));
	return false;
  },
  fileList,
};

const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={17}>
			<Card title="Informations de base">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={10}>
						<Form.Item name="libelle" label="Raison sociale de point de vente" rules={rules.liblle}>
							<Input placeholder="Libelle" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={4}>
						<Form.Item name="code_site" label="Code Site" rules={rules.code_site}>
							<Input placeholder="Code Site" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={10}>
						<Form.Item name="email" label="Email" rules={rules.email}>
							<Input placeholder="Email" />
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={24}>
						<Form.Item name="remarque" label="Remarque" rules={rules.remarque}>
							<Input.TextArea rows={4} />
						</Form.Item>
					</Col>
				</Row>
			</Card>
			<Card title="Autres Informations">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="decharge" label="Décharge" >
							<Select className="w-100" placeholder="Décharge">
								{
									etat_decharge.map(elm => (
										<Option key={elm} value={elm}>{elm}</Option>
									))
								}
							</Select>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<div>
							<Upload {...props}>
								<Button>
									<UploadOutlined /> Choisir la décharge
								</Button>
							</Upload>
							<Button
								type="primary"
								onClick={handleUpload}
								disabled={fileList.length === 0}
								loading={uploading}
								style={{ marginTop: 16 }}
							>
								{uploading ? 'Uploading' : 'Start Upload'}
							</Button>
						</div>
						
					</Col>
					
				</Row>
			</Card>
		</Col>
		<Col xs={24} sm={24} md={7}>
			<Card title="Media">
				<Dragger {...imageUploadProps} beforeUpload={beforeUpload} onChange={e => props.handleUploadChange(e)}>
					{
						props.uploadedImg ?
							<img src={props.uploadedImg} alt="avatar" className="img-fluid" />
							:
							<div>
								{
									props.uploadLoading ?
										<div>
											<LoadingOutlined className="font-size-xxl text-primary" />
											<div className="mt-3">Uploading</div>
										</div>
										:
										<div>
											<CustomIcon className="display-3" svg={ImageSvg} />
											<p>Click or drag file to upload</p>
										</div>
								}
							</div>
					}
				</Dragger>
			</Card>
			<Card >
				<Form.Item name="responsable" label="Responsable" >
					<Select className="w-100" placeholder="Responsable">
						{
							responsables.map(elm => (
								<Option key={elm} value={elm}>{elm}</Option>
							))
						}
					</Select>
				</Form.Item>
				<Form.Item name="zone" label="Zone" >
					<Select className="w-100" placeholder="Zone">
						{
							zones.map(elm => (
								<Option key={elm} value={elm}>{elm}</Option>
							))
						}
					</Select>
				</Form.Item>

			</Card>
		</Col>
	</Row>
)

export default GeneralField
