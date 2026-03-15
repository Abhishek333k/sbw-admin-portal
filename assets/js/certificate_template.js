function getCertificateHTML(data) {
    const year = new Date().getFullYear();
    const certID = data.id || `SBW-${year}-${Math.floor(100000 + Math.random() * 900000)}`; 
    const dateObj = data.date ? new Date(data.date) : new Date();
    const drillDate = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    // --- Enterprise Authorization Logic ---
    const isAuth = data.isAuthorized === true;
    const authBadge = isAuth 
        ? `<div class="hc-auth-status" style="background: #e6f4ea; border-color: #ceead6; color: #137333;">✓ Digitally Authorized</div>` 
        : `<div class="hc-auth-status" style="background: #fce8e6; border-color: #fad2cf; color: #c5221f;">⚠ Draft / Unauthorized</div>`;
    
    // Renders the Base64 signature if it exists, otherwise leaves blank space for a physical signature
    const signatureHTML = (isAuth && data.signatureBase64) 
        ? `<img src="${data.signatureBase64}" class="hc-sig-img" alt="Digital Signature">` 
        : `<div style="height: 60px; width: 100%;"></div>`;

    return `
    <style>
        .hc-wrap { padding: 15mm; border: 12px solid #f8f9fa; border-top: 16px solid #0b57d0; display: flex; flex-direction: column; color: #1f1f1f; font-family: sans-serif; background-image: radial-gradient(#e8eaed 1px, transparent 1px); background-size: 20px 20px; box-sizing: border-box; width: 210mm; min-height: 297mm; background-color: #ffffff; }
        .hc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
        .hc-brand h1 { font-size: 24px; font-weight: 700; color: #1f1f1f; margin: 0 0 4px 0; display: flex; align-items: center; gap: 8px;}
        .hc-brand p { margin: 0; font-size: 11px; color: #5f6368; text-transform: uppercase; letter-spacing: 1px;}
        .hc-badge { width: 70px; height: 70px; border-radius: 8px; border: 2px solid #dadce0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.05);}
        .hc-title-section { text-align: center; margin-bottom: 40px; }
        .hc-title { font-size: 28px; font-weight: 700; color: #1f1f1f; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 10px 0; }
        .hc-doc-id { font-family: monospace; font-size: 13px; color: #5f6368; background: white; padding: 4px 12px; border: 1px solid #dadce0; border-radius: 16px; display: inline-block;}
        .hc-client-bar { display: flex; justify-content: space-between; background: white; border: 1px solid #dadce0; border-radius: 8px; padding: 20px 24px; margin-bottom: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .hc-client-group { display: flex; flex-direction: column; gap: 4px; }
        .hc-lbl { font-size: 10px; color: #5f6368; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; }
        .hc-val { font-size: 16px; font-weight: bold; color: #1f1f1f; }
        .hc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .hc-card { background: white; border: 1px solid #dadce0; border-radius: 8px; padding: 20px; text-align: center; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .hc-card.highlight { background: #e8f0fe; border-color: #a8c7fa; }
        .hc-card.highlight .hc-card-val { color: #0b57d0; font-weight: 700; }
        .hc-card-val { font-size: 22px; font-weight: bold; color: #1f1f1f; margin-bottom: 8px; }
        .hc-card-lbl { font-size: 11px; color: #5f6368; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; }
        .hc-geo { background: white; border: 1px solid #dadce0; border-radius: 8px; padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: auto; }
        .hc-coords { font-family: monospace; font-size: 16px; font-weight: bold; color: #1f1f1f; margin-top: 4px; }
        .hc-auth-footer { border-top: 2px solid #dadce0; padding-top: 24px; display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;}
        .hc-auth-status { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 13px; border: 1px solid transparent; }
        .hc-signature-block { text-align: center; width: 200px; }
        .hc-sig-img { height: 60px; width: 100%; object-fit: contain; margin-bottom: 4px; opacity: 0.8; filter: grayscale(100%); }
        .hc-sig-line { border-top: 1px solid #1f1f1f; margin-bottom: 6px; }
    </style>

    <div class="hc-wrap">
        <div class="hc-header">
            <div class="hc-brand">
                <h1>Sagar Borewells</h1>
                <p>Execution & Technical Record</p>
            </div>
            <div class="hc-badge">
                <span style="font-size: 24px; color: #0b57d0;">✓</span>
                <span style="font-size: 8px; font-weight: bold; color: #5f6368; text-transform: uppercase; margin-top: 4px;">Verified</span>
            </div>
        </div>

        <div class="hc-title-section">
            <h2 class="hc-title">Borewell Birth Certificate</h2>
            <div class="hc-doc-id">DOC ID: ${certID}</div>
        </div>

        <div class="hc-client-bar">
            <div class="hc-client-group">
                <div class="hc-lbl">Property Owner</div>
                <div class="hc-val">${data.name || '--'}</div>
            </div>
            <div class="hc-client-group" style="text-align: right;">
                <div class="hc-lbl">Execution Date</div>
                <div class="hc-val">${drillDate}</div>
            </div>
        </div>

        <div class="hc-grid">
            <div class="hc-card">
                <div class="hc-card-val">${data.depth || '--'} <span style="font-size:14px; color:#5f6368;">Ft</span></div>
                <div class="hc-card-lbl">Total Depth</div>
            </div>
            <div class="hc-card highlight">
                <div class="hc-card-val">${data.yield || '--'}</div>
                <div class="hc-card-lbl">Water Yield</div>
            </div>
            <div class="hc-card">
                <div class="hc-card-val">${data.casing_depth || '--'} <span style="font-size:14px; color:#5f6368;">Ft</span></div>
                <div class="hc-card-lbl">Casing Installed</div>
            </div>
            <div class="hc-card">
                <div class="hc-card-val" style="font-size: 18px;">${data.casing_type || '--'}</div>
                <div class="hc-card-lbl">Casing Type</div>
            </div>
            <div class="hc-card">
                <div class="hc-card-val" style="font-size: 18px;">${data.rigType || '--'}</div>
                <div class="hc-card-lbl">Rig Implemented</div>
            </div>
            <div class="hc-card" style="grid-column: span 3;">
                <div class="hc-card-val" style="font-size: 20px;">${data.motor || '--'}</div>
                <div class="hc-card-lbl">Recommended Motor Configuration</div>
            </div>
        </div>

        <div class="hc-geo">
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <div class="hc-lbl">Geospatial Coordinates</div>
                <div class="hc-coords">${data.gps || "Not Recorded"}</div>
                <div style="font-size: 12px; color: #5f6368; margin-top: 4px;">${data.loc || "Location details unavailable"}</div>
            </div>
            <div>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://sagarborewells.com/verify?id=${certID}" style="width: 80px; height: 80px; border-radius: 4px; border: 1px solid #dadce0;">
            </div>
        </div>

        <div class="hc-auth-footer">
            ${authBadge}
            
            <div class="hc-signature-block">
                ${signatureHTML}
                <div class="hc-sig-line"></div>
                <div class="hc-lbl" style="font-weight: bold; font-size: 11px;">Chief Engineer Signature</div>
            </div>
        </div>
    </div>`;
}
