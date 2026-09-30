'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

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

type Thumb = { x: number; y: number; w: number; h: number }


export function ExperienceSection() {
    const [selected, setSelected] = useState(0)
    const [thumb, setThumb] = useState<Thumb | null>(null)
    // Transitions stay off until the thumb has been placed once, so it doesn't fly in from 0,0 on load
    const [ready, setReady] = useState(false)
    const tabsRef = useRef<HTMLDivElement>(null)
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

    const measure = useCallback(() => {
        const el = tabRefs.current[selected]
        if (!el) return
        setThumb({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight })
    }, [selected])

    useLayoutEffect(() => { measure() }, [measure])

    // keep the thumb aligned when the layout changes (resize, font load, desktop <-> mobile)
    useEffect(() => {
        const tabs = tabsRef.current
        if (!tabs) return
        const observer = new ResizeObserver(measure)
        observer.observe(tabs)
        return () => observer.disconnect()
    }, [measure])

    useEffect(() => {
        if (!thumb || ready) return
        const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
        return () => cancelAnimationFrame(id)
    }, [thumb, ready])

    const thumbStyle = thumb
        ? ({
            '--thumb-x': `${thumb.x}px`,
            '--thumb-y': `${thumb.y}px`,
            '--thumb-w': `${thumb.w}px`,
            '--thumb-h': `${thumb.h}px`
        } as CSSProperties)
        : undefined

    return (
        <section className="section-shell experience" id="experience">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">experience</p>
                    <h2>over the years<em>.</em></h2>
                </div>
            </div>
            <div className="experience-selector">
                <div className="experience-tabs" role="tablist" aria-label="Experience history" ref={tabsRef}>
                    <span
                        className={`experience-thumb${thumb ? ' is-placed' : ''}${ready ? ' is-animated' : ''}`}
                        style={thumbStyle}
                        aria-hidden="true"
                    />
                    {experience.map((item, index) => (
                        <button
                            className={selected === index ? 'selected' : ''}
                            onClick={() => setSelected(index)}
                            role="tab"
                            id={`experience-tab-${index}`}
                            aria-controls={`experience-panel-${index}`}
                            aria-selected={selected === index}
                            ref={el => { tabRefs.current[index] = el }}
                            key={item.company}
                        >
                            {item.company}
                        </button>
                    ))}
                </div>
                {/* All panels share one grid cell, so the card (and the gray track beside it)
                    is always as tall as the longest panel and never resizes when the tab changes. */}
                <div className="experience-detail">
                    {experience.map((item, index) => (
                        <div
                            className={`experience-panel${selected === index ? ' active' : ''}`}
                            role="tabpanel"
                            id={`experience-panel-${index}`}
                            aria-labelledby={`experience-tab-${index}`}
                            aria-hidden={selected !== index}
                            inert={selected !== index}
                            key={item.company}
                        >
                            <p className="experience-role">{item.role} @ <span> {item.company}</span></p>
                            <p className="experience-period">{item.period}</p>
                            <ul>
                                {item.details.map((detail, i) => (
                                    <li style={{ '--i': i } as CSSProperties} key={detail}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}