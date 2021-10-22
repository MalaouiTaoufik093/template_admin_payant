// import React from 'react'
// import { Input, Row, Col, Card, Form, Button, InputNumber } from 'antd';
// import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import React, {useState} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Tag } from 'antd';
import MaterielListData from "assets/data/materiel-list.data.json"
import { EyeOutlined, FileExcelOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import moment from 'moment'; 
import { DATE_FORMAT_DD_MM_YYYY,DATE_FORMAT_YYYY_MM_dd } from 'constants/DateConstant'
import utils from 'utils'

const { Option } = Select

const getPaymentStatus = status => {
	if(status === 'Bon_etat') {
		return 'success'
	}
	if(status === 'Neuf' || status === 'neuf' ) {
		return 'success'
	}
	return 'red'
}

const getShippingStatus = status => {
	if(status <= 2016 ) {
		return 'red'
	}
	if(status >= 2017 ) {
		return 'cyan'
	}
	return ''
}

const Type_peripherique = ['Ordinateur Bureau', 'Ordinateur portable', 'Scanner', 'Imprimante laser','4 en 1','TEL Fixe' ]

const VariationField = props => {
	const [list, setList] = useState(MaterielListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleShowStatus = value => {
		if(value !== 'All') {
			const key = 'type'
			const data = utils.filterArray(MaterielListData, key, value)
			setList(data)
		} else {
			setList(MaterielListData)
		}
	}

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			{/* <Menu.Item>
				<Flex alignItems="center">
					<PlusCircleOutlined />
					<span className="ml-2">Add to remark</span>
				</Flex>
			</Menu.Item> */}
		</Menu>
	);

	const tableColumns = [
		{
			title: 'Réf',
			dataIndex: 'referance'
		},
		{
			title: 'Type',
			dataIndex: 'type',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={30} src='/img/pc1.jpg' name={record.type}/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'type')
		},
		{
			title: 'Date Afféctation',
			dataIndex: 'date_affectation',
			// render: (_, record) => (
			// 	<span>{moment.unix(record.date_affectation).format(DATE_FORMAT_YYYY_MM_dd)}</span>
			// ),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'date_affectation')
		},
		{
			title: 'Année achat',
			dataIndex: 'annee_achat',
			render: (_, record) => (
				<><Tag color={getShippingStatus(record.annee_achat)}>{record.annee_achat}</Tag></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'annee_achat')
		},
		{
			title: 'Etat',
			dataIndex: 'etat',
			render: (_, record) => (
				<><Badge status={getPaymentStatus(record.etat)} /><span>{record.etat}</span></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'etat')
		},
		{
			title: 'Marque',
			dataIndex: 'marque',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'marque')
		},
		{
			title: 'Model',
			dataIndex: 'model',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'model')
		},
		{
			title: 'Décharge',
			dataIndex: 'decharge',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'decharge')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
				</div>
			)
		}
	];
	
	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : MaterielListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	return (
	<Card title="Variants">
			<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Recherche" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowStatus} 
							placeholder="Status"
						>
							<Option value="All">Type  </Option>
							{Type_peripherique.map(elm => <Option key={elm} value={elm}>{elm}</Option>)}
						</Select>
					</div>
				</Flex>
				<div>
					<Button type="primary" icon={<FileExcelOutlined />} block>Exporter</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
					// rowSelection={{
					// 	selectedRowKeys: selectedRowKeys,
					// 	type: 'checkbox',
					// 	preserveSelectedRowKeys: false,
					// 	...rowSelection,
					// }}
				/>
			</div>
		</Card>

	</Card>
	)
}

export default VariationField
