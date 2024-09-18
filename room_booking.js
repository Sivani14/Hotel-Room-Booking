// gsap animations
gsap.from('.header',{ duration:1, y: '-100%'} )
gsap.from('.r_specifications',{ duration:2, y: '-100%',opacity:0,  delay: 1} )

// const timeline = gsap.timeline({defaults: {duration: 1}});
// timeline.from('.header',{ y: '-100%'})
// .from('.r_specifications',{ y: '-100%',opacity:0,  delay: 1, stagger:0.5})

window.onload=function(){
    var x= (new Date()).toISOString();
    document.getElementById("f_date").value=x.substring(0,10);
    document.getElementById("t_date").value=x.substring(0,10);
}

document.getElementById("submit_btn").onclick = function() {
    
    var days;
    var fd=document.getElementById("f_date").value;
    var td=document.getElementById("t_date").value;

    var r_type;
    var deluxe=document.getElementById("deluxe");
    var ac=document.getElementById("ac");
    var nac=document.getElementById("nac");

    var adult=parseInt(document.getElementById("adult").value);
    var child=parseInt(document.getElementById("child").value);

    // Number of days
    if(fd<td){
        var ms = new Date();
        ms= new Date(td)-new Date(fd);
        days=Math.round(ms)/(1000*60*60*24);
        // alert("no of days "+days);

        // Room type
        if(deluxe.checked)
            r_type="deluxe";
        if(ac.checked)
            r_type="ac";
        if(nac.checked)
            r_type = "nac";
        // alert("you checked " +r_type+ " room")

        // Billing
        var bill=0;
        var tbill=0;
        var a_bill=0;
        var c_bill=0;
        var c_gst=0;
        var s_gst=0;
        var ad_adult=0;
        var ad_child=0;
        var people = adult+child+ad_adult+ad_child;
        var ad_people=adult+ad_adult;
        var ch_people=child+ad_child;
        
        if(people>5){
            alert("You can't book as the max people number exceeds over 5 people.... We've already mentioned at below the Charges table. Kindly read the note...!");
        }
        else{

            function gst(bill){
                var a = bill;
                c_gst=a*(5/100);
                s_gst=a*(5/100);
                return c_gst+s_gst;
            }
    
            if(adult !=0 || child!=0)
                {
                // Billing for deluxe room
                if (r_type=="deluxe")
                    {
                        bill=days*7000;
                        // Additional room takers
                    if(adult>2)
                        {
                            ad_adult=adult-2;
                            // alert("additional adult "+ad_adult);
                            a_bill=ad_adult*2000;
                            // alert("your bill is "+(bill+a_bill)+" for " +days+" day(s) with ad+adult "+ad_adult);
                        }
                    if(child>2)
                        {
                            ad_child=child-2;
                            // alert("additional child "+ad_child);
                            c_bill=ad_child*1000;
                            // alert("your bill is "+(bill+c_bill)+" for " +days+" day(s)with ad+child "+ad_child);
                        }
                        tbill=bill+a_bill+c_bill;
                        tbill= tbill+gst(tbill);
                        // alert("Your total bill "+tbill+" with taxes for DELUXE room");
                    }
    
                    // Billing for AC room
                    if (r_type=="ac")
                        {
                            bill=days*3500;
                            // Additional room takers
                        if(adult>2)
                            {
                                ad_adult=adult-2;
                                // alert("additional adult "+ad_adult);
                                a_bill=ad_adult*1000;
                                // alert("your bill is "+(bill+a_bill)+" for " +days+" day(s) with ad+adult "+ad_adult);
                            }
                        if(child>2)
                            {
                                ad_child=child-2;
                                // alert("additional child "+ad_child);
                                c_bill=ad_child*500;
                                // alert("your bill is "+(bill+c_bill)+" for " +days+" day(s)with ad+adult "+ad_child);
                            }
                            tbill=bill+a_bill+c_bill;
                            tbill= tbill+gst(tbill);
                            // alert("Your total bill "+tbill+" with taxes for AC room");
                        }
            
                        // Billing for NonAC room
                        if (r_type=="nac")
                            {
                                bill=days*1500;
                                // Additional room takers
                            if(adult>2)
                                {
                                    ad_adult=adult-2;
                                    // alert("additional adult "+ad_adult);
                                    a_bill=ad_adult*500;
                                    // alert("your bill is "+(bill+a_bill)+" for " +days+" day(s) with ad+adult "+ad_adult);
                                }
                            if(child>2)
                                {
                                    ad_child=child-2;
                                    // alert("additional child "+ad_child);
                                    c_bill=ad_child*300;
                                    // alert("your bill is "+(bill+c_bill)+" for " +days+" day(s)with ad+adult "+ad_child);
                                }
                                tbill=bill+a_bill+c_bill;
                                tbill= tbill+gst(tbill);
                                // alert("Your total bill "+tbill+" with taxes for NON AC room");
                            }
            } //code billing ends here
            else
            {
                alert("Please specify the room members.....");
            }
        } //(people>5) ends here...

        if(tbill !=0){
            var res=`
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                        data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header bg-info-subtle">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel"> &#127811;Heaven Stay Hotel&#127796;....</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-0">
                                <div class="poster_tint text-white">
                                    <br>
                                    Check In &nbsp;&nbsp;&nbsp;                        :&nbsp;&nbsp;${fd}<br>
                                    Check Out &nbsp;&nbsp;                                   :&nbsp;&nbsp;${td}<br>
                                    Number of Booking days &nbsp;&nbsp;          :&nbsp;&nbsp;${days}<br>
                                    Number of Persons Staying &nbsp;&nbsp;       :&nbsp;&nbsp;${people}<br>
                                    Type of Room &nbsp;&nbsp;                            :&nbsp;&nbsp;${r_type}<br>
                                    Room Rent &nbsp;&nbsp;                                 :&nbsp;&nbsp;${bill}/-<br>
                                    -------------------------------------------------<br>
                                    <b>Regular</b><br>
                                    -------------------------------------------------<br>
                                    Adult &nbsp;                                           :&nbsp;&nbsp;${ad_people}<br>
                                    Child&nbsp;&nbsp;                                             :&nbsp;&nbsp;${ch_people}<br><br>
                                    <b>Additional Charges for</b> <br>
                                    <b>--------------------------------------------------</b><br>
                                    &nbsp;&nbsp; *Adults&nbsp;       :&nbsp;&nbsp; ${ad_adult} &nbsp; [fare &nbsp;${a_bill}/-]<br>
                                    &nbsp;&nbsp; *Child&nbsp;&nbsp;          :&nbsp;&nbsp;${ad_child} &nbsp; [fare &nbsp;${c_bill}/-]<br><br>
                                    &nbsp;&nbsp;    GST          :&nbsp;&nbsp;${s_gst+c_gst}/-&nbsp;(SGST:&nbsp;&nbsp;${s_gst}/- + CGST:&nbsp;&nbsp;${c_gst}/-)
                                    <p>Yes!&#128543; Taxes hurts&#128579;....</p>
                                    
                                    <b>Total bill&nbsp;(with GST)               &nbsp;&nbsp;                      :&nbsp;&nbsp;${tbill}/-</b>
                                    <br><br>
                                </div>
                            </div>
                            <div class="modal-footer bg-info-subtle">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Print Bill</button>
                            </div>
                            </div>
                        </div>
                        </div>
        `;
        document.getElementById("modal").innerHTML=res;
        var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        modal.show();
        }
    } // fd<td ends here...

    else
    {
        alert("Choose a valid date please......");
    }
} //onclick function ends here...