    renderParticipants() {
        const container = document.getElementById('participantsList');
        if (!container) return;

        const html = Array.from(this.participants.values()).map(p => {
            const protocols = Array.isArray(p.protocols) ? p.protocols.join(' ') : (p.protocols || '');
            const status = p.status?.connection || p.status || 'offline';
            
            return `
                <div class="participant-card" onclick="app.selectParticipant('${p.id}')">
                    <div class="participant-header">
                        <span class="participant-callsign">${p.callsign}</span>
                        <span class="participant-status ${status}">${this.getStatusIcon(status)}</span>
                    </div>
                    <div class="participant-role">${p.role}</div>
                    <div class="participant-protocols">${protocols}</div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }
