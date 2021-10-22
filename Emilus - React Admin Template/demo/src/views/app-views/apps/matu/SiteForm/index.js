import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './SiteField'
import VariationField from './MaterielField'
import ShippingField from './UtilisateurField'
//import ProductListData from "assets/data/product-list.data.json"
import SiteListData from "assets/data/sites-list.data.json"

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = props => {

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	const [agence, setAgence] = useState('agence');

	useEffect(() => {
    	if(mode === EDIT) {
			console.log('is edit')
			console.log('props', props)
			const { id } = param
			const produtId = parseInt(id)
		
			const productData = SiteListData.filter( product => product.id_site === produtId)
			
			const product = productData[0]
			setAgence(product.libelle)
			form.setFieldsValue({
				comparePrice: 0.00,
				cost: 0.00,
				taxRate: 6,
				remarque: product.remarque,
				category: product.zone,
				libelle: product.libelle,
				email: product.email,
				code_site: product.code_site
			});
			setImage(product.image)
		}
  	}, [form, mode, param, props]);

	const handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			setUploadLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl =>{
				setImage(imageUrl)
				setUploadLoading(true)
			});
		}
	};

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if(mode === ADD) {
					message.success(`Created ${values.name} to product list`);
				}
				if(mode === EDIT) {
					message.success(`Product saved`);
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg'
				}}
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD'? 'Nouveau Site' : `Modification de point de vente : `+ agence} </h2>
							<div className="mb-3">
								<Button className="mr-2">Discard</Button>
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
				{mode === 'EDIT'
				? 
				<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab="General" key="1">
							<GeneralField 
								uploadedImg={uploadedImg} 
								uploadLoading={uploadLoading} 
								handleUploadChange={handleUploadChange}
							/>
						</TabPane>
						
						<TabPane tab="Matériels" key="2">
							<VariationField />
						</TabPane>
						<TabPane tab="Utilisateurs" key="3">
							<ShippingField />
						</TabPane>
					</Tabs>				 
				: 
				<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab="General" key="1">
							<GeneralField 
								uploadedImg={uploadedImg} 
								uploadLoading={uploadLoading} 
								handleUploadChange={handleUploadChange}
							/>
						</TabPane>
					</Tabs>
				}
					
				</div>
			</Form>
		</>
	)
}

export default ProductForm
