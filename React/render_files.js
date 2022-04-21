		return(
			<object width="100%" height="600px" 
		            data={`data:application/pdf;base64,${this.state.pdf_bytes}`} 
		            type="application/pdf" class="internal"
		        >
		            <embed 
		                src={`data:application/pdf;base64,${this.state.pdf_bytes}`}
		                type="application/pdf"
		            />
		        </object>
		);