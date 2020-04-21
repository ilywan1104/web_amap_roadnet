import React, { useState, ReactEventHandler } from 'react'
import { Button, Popover, Icon, Radio, Checkbox, Divider, Row, Col } from 'antd'
import _config from '@/config'
import indexless from './index.less'

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginLeft: 0,
};

const RadioGroupPop = ({ options = [], ...rest }) => (
    <Radio.Group {...rest}>
        {options.length ? options.map((item, index) => <Radio
            key={index.toString()}
            value={item.value}
            record={item}
            style={radioStyle}
        >
            {item.label}
        </Radio>) : null}
    </Radio.Group>
)

const CheckboxGroupPop = ({ options = [], layout = { gutter: 0, span: 24 }, ...rest }) => (
    <Checkbox.Group {...rest}>
        <Row gutter={layout.gutter}>
            {options.length ? options.map((item, index) => <Col
                span={layout.span}
                key={index.toString()}
            >
            <Checkbox
                value={item.value}
                record={item}
                style={radioStyle}
            >
                {item.label}
            </Checkbox>
            </Col>) : null}
        </Row>
    </Checkbox.Group>
)

export default ({
    onAreaChange = () => null,
    onTypeChange = () => null,
    onTypeToggle = () => null,
    onLayerChange = () => null,
    onStyleChange = () => null,
    areaValues,
    typeValue,
    layerValue,
    styleValue,
}) => (
        <div className={indexless['toolbar']} id="tool-bar">
            <div className={indexless['toolbar-item']}>
                <Popover
                    placement="bottomLeft"
                    content={<RadioGroupPop
                        value={areaValues.value}
                        onChange={onAreaChange}
                        options={_config.areas.options}
                    />}
                    getPopupContainer={() => document.getElementById('tool-bar')}
                    // trigger="click"
                >
                    <Button type="link"><Icon type="environment" theme="filled" /> {areaValues.label}</Button>
                </Popover>
            </div>
            <div className={indexless['toolbar-item']}>
                <Popover
                    content={<>
                        <Button
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                width: '100%'
                            }}
                            onClick={onTypeToggle}
                            type='link'
                        >
                            {typeValue.length ? '全部关闭' : '全部选中'}
                        </Button>
                        <Divider style={{ margin: '5px 0' }} dashed />
                        <CheckboxGroupPop
                            layout={{
                                gutter: 0,
                                span: 12,
                            }}
                            value={typeValue}
                            onChange={onTypeChange}
                            options={_config.types.options}
                        />
                    </>}
                    getPopupContainer={() => document.getElementById('tool-bar')}
                    // trigger="click"
                >
                    <Button type="link"><Icon type="funnel-plot" theme="filled" /> 道路等级</Button>
                </Popover>
            </div>
            <div className={indexless['toolbar-item']}>
                <Popover
                    content={<CheckboxGroupPop
                        value={layerValue}
                        onChange={onLayerChange}
                        options={_config.layers.options}
                    />}
                    getPopupContainer={() => document.getElementById('tool-bar')}
                    // trigger="click"
                >
                    <Button type="link"><Icon type="appstore" theme="filled" /> 图层</Button>
                </Popover>
            </div>
            <div className={`${indexless['toolbar-item']} ${indexless['no-after']}`}>
                <Popover
                    placement="bottomRight"
                    content={<RadioGroupPop
                        value={styleValue}
                        onChange={onStyleChange}
                        options={_config.styles.options}
                    />}
                    getPopupContainer={() => document.getElementById('tool-bar')}
                    // trigger="click"
                >
                    <Button type="link"><Icon type="skin" theme="filled" /> 风格</Button>
                </Popover>
            </div>
        </div>
    )