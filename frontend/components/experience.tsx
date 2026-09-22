'use client'

import { useState } from 'react'


const experience = [
    {
        company: 'yaspi',
        role: 'data engineer',
        period: 'feb 2025 - present',
        details: [
            'flood-risk machine learning model', 'building automated pipelines and analytical workflows', 'sql exploratory analysis'] },
    {
        company: 'cci kenya',
        role: 'contact center agent',
        period: 'aug 2024 - jan 2025',
        details: [
            'investigated fraud-related cases by analyzing data',
            'improved reporting workflows and data quality',
            'assess accounts to identify patterns and support accurate resolution',
            'generated frontline service insights that supported issue resolution'
        ]
    },
    {
        company: 'perk group africa',
        role: 'cloud gis consultant',
        period: 'jul 2023 - aug 2024',
        details: [
            'african lakes hub project',
            'built dashboards and analytical summaries',
            'deployed data-driven web gis solutions',
            'designed and implemented spatial databases'
        ]
    },
    {
        company: 'national museums of kenya',
        role: 'project assistant',
        period: 'nov 2018 - dec 2021',
        details: [
            'developed data pipelines that extracted insights from historical datasets',
            'processed and modeled data from structured and semi-structured sources',
            'improved data quality and consistency by introducing Darwin Core standards',
            'mined data from literature, databases using automated extraction and feature engineering',
            'processed and organized complex field and research data',
            'contributed to analytical outputs by transforming raw species data into structured information',
            'assisted in quality reviews and metadata documentation'
        ]
    }
]

export function ExperienceSection() { const [selected, setSelected] = useState(0); const current = experience[selected]; return <section className="section-shell experience" id="experience"><div className="section-heading"><div><p className="eyebrow">experience</p><h2>over the years<em>.</em></h2></div></div><div className="experience-selector"><div className="experience-tabs" role="tablist" aria-label="Experience history">{experience.map((item, index) => <button className={selected === index ? 'selected' : ''} onClick={() => setSelected(index)} role="tab" aria-selected={selected === index} key={item.company}>{item.company}</button>)}</div><div className="experience-detail"><p className="experience-role">{current.role} @ <span> {current.company}</span></p><p className="experience-period">{current.period}</p><ul>{current.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div></div></section> }
