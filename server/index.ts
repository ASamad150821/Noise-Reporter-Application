import express from 'express';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { randomUUID } from 'crypto';
import { resolve } from 'path';
import { reportSchema, updateReportSchema } from "../src/schemas/yourDetails";
import { ZodError } from 'zod';
import { Report } from "../src/schemas/yourDetails"
import { ReportUpdate } from '../src/schemas/yourDetails';

const app = express();
app.use(express.json());

const DB_PATH = resolve(process.env.REPORTS_DB_PATH ?? 'server/reports.json');

function loadReports(): Report[] {
    if(!existsSync(DB_PATH)) {
        return [];
    }

    return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
}

function saveReports(reports: object[]) {
    writeFileSync(DB_PATH, JSON.stringify(reports, null, 2))
};

function loadReport(reportID: string) : Report | undefined {
    
    const records = loadReports();
    const record = records.find((record) => record.caseReference === reportID);
    return record;
}

function removeReport(reportID: string) : boolean {
    const records = loadReports();
    const recordIndex = records.findIndex((record) => record.caseReference === reportID);

    if(recordIndex === -1) {
       return false
    }

    records.splice(recordIndex, 1);
    saveReports(records);
    return true
}

function updateReport(caseReference: string, changes: ReportUpdate) : Report | undefined {
    const records = loadReports();
    const record = records.find((record) => record.caseReference === caseReference);
    if(!record) {
        return undefined
    }

    Object.assign(record, changes);
    saveReports(records);
    return record
}

app.get('/api/health', (_req, res) => 
    {
        res.json({status: "ok"})
    }
);

app.get('/api/readReports', (_req, res) => {
    
    try {
        const reports = loadReports();
        res.status(200).json({
            reports: reports
        })
    } catch( error : any ) {
        res.status(500).json({
            message: "Something unexpected happened. Please Try Again"
        })
    }
})

app.post('/api/SubmitCase', (req, res) => {
    
    try{
        const parsed =  reportSchema.parse(req.body); // express middleware will attach the body of the request onto req.body

        const caseReference = `NR-${randomUUID().slice(0, 8).toUpperCase()}`;
        const report = { ...parsed, caseReference, submittedAt : new Date().toISOString() };
        
        const reports = loadReports();
        reports.push(report)
        saveReports(reports);
        
        console.log("New Report Received", report);
        res.status(201).json({ caseReference })
        
    }
      catch (error) {
        if(error instanceof ZodError) {
          const fieldErrors : Record<string, string> = {}
          for (const issue of error.issues) {
            const field = String(issue.path[0] ?? "body");
            if(!fieldErrors[field]) {
            fieldErrors[field] = issue.message
            }
          }
       return res.status(400).json({
            message : "Invalid Input. Please Try Again", 
            errors : fieldErrors
        })
        }
        res.status(500).json({
            message : "Something Unexpected Happen. Please Try Again"
        })
      }

});

app.get('/api/readReport/:caseReference', (req, res) =>

    {
        try {
           const recordfound = loadReport(req.params.caseReference);
           if(!recordfound) {
            return res.status(404).json({message: "Record has not been found"})
           }
           res.status(200).json({message: "Record has been found", record: recordfound})
        } catch {
            res.status(500).json({message: "Something unexpected happened. Please Try Again"})
        }

    }
)

app.delete('/api/deleteReport/:caseReference', (req, res) => {
    try {
       const result =  removeReport(req.params.caseReference);
       if(!result) {
            return res.status(404).json({message: "Record has not been deleted"})
        } 
       res.status(200).json({
            message : "Record has been deleted"
        })
    } catch {
        res.status(500).json({message: "Something unexpected happened. Please Try Again"})
    }
})

app.patch('/api/updateReport/:caseReference', (req, res) => {
    try {
        const changes = updateReportSchema.parse(req.body);
        const record = updateReport(req.params.caseReference, changes);
        if(!record) {
            return res.status(404).json({message: "Record has not been updated as it was not initially found"})
        }    
        res.status(200).json({
            message: "Record has been updated",
            recordupdated: record
        })
    } catch (error: any) {
        if(error instanceof ZodError) {
            const fieldErrors : Record<string, string> = {};
            for(const issue of error.issues) {
                const field = String(issue.path[0] ?? "body")
                if(!fieldErrors[field]) {
                    fieldErrors[field] = issue.message
                }
            }
            return res.status(400).json({
                message: "Invalid Input. Please Try Again",
                errors: fieldErrors
            })
        }

        res.status(500).json({
            message: "Something unexpected happened. Please Try Again"
        })
    }
})


const PORT = Number(process.env.PORT ?? 3001);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})